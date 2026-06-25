<script lang="ts">
	import { onMount } from "svelte";
	import "./layout.css";
	import ThemeToggle from "$lib/ThemeToggle.svelte";
	import AiBadge from "$lib/AiBadge.svelte";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();

	// Mouse tracking and cursor state
	let isHovering = $state(false);
	let isScrolled = $state(false);
	let canvasEl = $state<HTMLCanvasElement | null>(null);

	onMount(() => {
		const canvas = canvasEl;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		const handleResize = () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", handleResize);

		const handleHeaderScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener("scroll", handleHeaderScroll);
		handleHeaderScroll(); // initial state

		// Particle structures
		interface Spark {
			x: number;
			y: number;
			vx: number;
			vy: number;
			alpha: number;
			size: number;
			color: string;
		}

		interface TrailPoint {
			x: number;
			y: number;
			age: number;
		}

		let sparks: Spark[] = [];
		let trail: TrailPoint[] = [];
		const maxTrail = 18;

		const handleMouseMove = (e: MouseEvent) => {
			// Append point to trail
			trail.unshift({ x: e.clientX, y: e.clientY, age: 0 });
			if (trail.length > maxTrail) {
				trail.pop();
			}

			// Decide color based on dark mode class
			const isDark = document.documentElement.classList.contains("dark");
			const sparkColor = isDark
				? Math.random() > 0.5
					? "#06b6d4"
					: "#8b5cf6"
				: Math.random() > 0.5
					? "#8b5cf6"
					: "#ec4899";

			// Spawn sparkles
			if (Math.random() < 0.65) {
				sparks.push({
					x: e.clientX,
					y: e.clientY,
					vx: (Math.random() - 0.5) * 3,
					vy: (Math.random() - 0.5) * 3,
					alpha: 1.0,
					size: Math.random() * 2.5 + 1.2,
					color: sparkColor,
				});
			}

			// Spotlight effect coordinator
			const target = e.target as HTMLElement;
			const card = target.closest(".spotlight-card") as HTMLElement;
			if (card) {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				card.style.setProperty("--mouse-x", `${x}px`);
				card.style.setProperty("--mouse-y", `${y}px`);
			}

			// Interactive hover detection
			const interactive = target.closest(
				'a, button, select, input, [role="button"], .interactive-element',
			);
			isHovering = !!interactive;
		};

		window.addEventListener("mousemove", handleMouseMove);

		let animId: number;
		const tick = () => {
			ctx.clearRect(0, 0, width, height);

			const isDark = document.documentElement.classList.contains("dark");
			const glowColor = isDark ? "#06b6d4" : "#8b5cf6";
			const trailColor = isDark
				? "rgba(6, 182, 212, 0.45)"
				: "rgba(139, 92, 246, 0.45)";

			// 1. Draw tapered comet trail
			if (trail.length > 1) {
				for (let i = 0; i < trail.length - 1; i++) {
					const p1 = trail[i];
					const p2 = trail[i + 1];
					const ratio = 1 - i / trail.length;

					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);

					ctx.strokeStyle = trailColor;
					ctx.lineWidth = ratio * (isHovering ? 10 : 5);
					ctx.lineCap = "round";
					ctx.shadowBlur = ratio * 15;
					ctx.shadowColor = glowColor;
					ctx.stroke();
				}

				// Draw high-intensity white core
				ctx.beginPath();
				ctx.moveTo(trail[0].x, trail[0].y);
				for (let i = 1; i < trail.length; i++) {
					ctx.lineTo(trail[i].x, trail[i].y);
				}
				ctx.strokeStyle = "#ffffff";
				ctx.lineWidth = isHovering ? 2.5 : 1.5;
				ctx.shadowBlur = 4;
				ctx.shadowColor = "#ffffff";
				ctx.stroke();
			}

			// Update trail points
			trail.forEach((p) => p.age++);
			trail = trail.filter((p) => p.age < maxTrail);

			// 2. Draw fading spark particles
			for (let i = sparks.length - 1; i >= 0; i--) {
				const spark = sparks[i];
				spark.x += spark.vx;
				spark.y += spark.vy;
				spark.alpha -= 0.022;

				if (spark.alpha <= 0) {
					sparks.splice(i, 1);
					continue;
				}

				ctx.save();
				ctx.globalAlpha = spark.alpha;
				ctx.beginPath();
				ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
				ctx.fillStyle = spark.color;
				ctx.shadowBlur = 8;
				ctx.shadowColor = spark.color;
				ctx.fill();
				ctx.restore();
			}

			animId = requestAnimationFrame(tick);
		};
		tick();

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleHeaderScroll);
			cancelAnimationFrame(animId);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Luan Bui (Lucas) | Portfolio</title>
	<meta
		name="description"
		content="Liquid glass portfolio of Luan Bui (Lucas) - Middle Backend Engineer & Team Lead"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Canvas-based Comet Cursor Trail -->
<canvas bind:this={canvasEl} class="pointer-events-none fixed inset-0 z-10"
></canvas>

<div class="relative min-h-screen bg-grid-pattern pb-16 overflow-x-clip">
	<!-- Liquid Background Blobs -->
	<div
		class="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-cyan/15 rounded-full filter blur-[120px] -z-10 animate-blob pointer-events-none"
	></div>
	<div
		class="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-purple/15 rounded-full filter blur-[120px] -z-10 animate-blob pointer-events-none"
		style="animation-delay: 5s;"
	></div>
	<div
		class="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-brand-pink/10 rounded-full filter blur-[120px] -z-10 animate-blob pointer-events-none"
		style="animation-delay: 10s;"
	></div>

	<!-- Sticky Header Capsule -->
	<div
		class="sticky top-0 z-50 w-full flex justify-center pointer-events-none transition-all duration-500 {isScrolled
			? 'pt-0 px-0'
			: 'pt-4 px-4'}"
	>
		<header
			class="pointer-events-auto flex items-center justify-center w-full backdrop-blur-xl transition-all duration-500 {isScrolled
				? 'max-w-full rounded-none border-b border-t-0 border-x-0 border-slate-200/80 dark:border-white/20 px-6 sm:px-10 py-3 bg-white/80 dark:bg-slate-950/80 shadow-lg'
				: 'max-w-5xl rounded-4xl border border-slate-200/40 dark:border-white/10 px-6 py-3.5 bg-white/40 dark:bg-slate-950/40 shadow-md'}"
		>
			<div class="flex items-center justify-between w-full max-w-6xl">
				<a href="/" class="flex items-center space-x-2 select-none group">
					<div
						class="w-7 h-7 rounded-lg bg-linear-to-tr from-brand-cyan to-brand-purple p-0.5 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-brand-cyan/20 group-hover:scale-105 transition-transform"
					>
						L
					</div>
					<span
						class="font-extrabold text-xs tracking-wider text-slate-800 dark:text-slate-200"
					>
						LUAN BUI
					</span>
				</a>

				<div class="flex items-center space-x-4">
					<nav
						class="hidden md:flex items-center space-x-6 text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
					>
						<a href="#about" class="hover:text-brand-cyan transition-colors"
							>About</a
						>
						<a
							href="#side-project"
							class="hover:text-brand-cyan transition-colors"
							>Featured Project</a
						>
						<a
							href="#experience"
							class="hover:text-brand-cyan transition-colors">Experience</a
						>
						<a href="#projects" class="hover:text-brand-cyan transition-colors"
							>Projects</a
						>
						<a href="#skills" class="hover:text-brand-cyan transition-colors"
							>Skills</a
						>
					</nav>

					<div class="flex items-center gap-2">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</header>
	</div>

	<!-- Main content slot -->
	<main class="relative max-w-6xl mx-auto px-4 sm:px-8 py-8 z-20">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer
		class="relative w-full mt-24 border-t border-white/10 dark:border-white/5 pt-8 text-center max-w-6xl mx-auto px-4 sm:px-8 z-20"
	>
		<div
			class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400"
		>
			<div>
				© {new Date().getFullYear()} Bui Thanh Luan (Lucas). All rights reserved.
			</div>

			<div class="flex items-center gap-2">
				<AiBadge />
			</div>
		</div>
	</footer>
</div>
