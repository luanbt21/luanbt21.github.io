<script lang="ts">
	import { onMount } from "svelte";

	// State for the scroll-driven SVG line
	let svgPath = $state<SVGPathElement | null>(null);

	onMount(() => {
		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (!svgPath) { ticking = false; return; }
					const timeline = document.getElementById("experience-timeline");
					if (!timeline) { ticking = false; return; }

					const rect = timeline.getBoundingClientRect();
					const windowHeight = window.innerHeight;

					// Draw the path as the timeline scrollport passes the middle of the screen
					const scrollStart = rect.top - windowHeight / 2;
					const totalScroll = rect.height;
					const progress = Math.min(Math.max(-scrollStart / totalScroll, 0), 1);

					const pathLength = svgPath.getTotalLength();
					svgPath.style.strokeDasharray = `${pathLength}`;
					svgPath.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleScroll);
		setTimeout(handleScroll, 100);

		// IntersectionObserver for lazy scroll reveal
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("revealed");
					}
				});
			},
			{
				threshold: 0.08,
				rootMargin: "0px 0px -40px 0px",
			},
		);

		// Query and observe items
		const revealElements = document.querySelectorAll(".reveal-on-scroll");
		revealElements.forEach((el) => revealObserver.observe(el));

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
			revealObserver.disconnect();
		};
	});

	// Projects Data
	const projects = [
		{
			title: "Academy School Management",
			period: "Mar 2025 – May 2026",
			desc: "Platform for administrative and academic management (lecturers, training progress, scientific research, equipment).",
			responsibilities: [
				"Digitized complex academic workflows including course registration and thesis validation.",
				"Engineered an automated graduation auditing engine reducing administrative overhead.",
				"Designed a modular RBAC (Role-Based Access Control) security model.",
			],
			tags: [
				"Turbo Monorepo",
				"Bun",
				"HonoJS",
				"NextJS",
				"Prisma",
				"PostgreSQL",
			],
		},
		{
			title: "Order Image Processing Service",
			period: "Aug 2025 – Oct 2025",
			desc: "High-concurrency pipeline managing the lifecycle of image-based orders (upload, watermark, resize).",
			responsibilities: [
				"Built a Rust processing pipeline to minimize memory usage during concurrent watermark injection.",
				"Integrated NATS message queuing to guarantee image processing tasks during peak traffic.",
			],
			tags: ["Rust", "NATS Queue", "Docker", "Microservices", "Concurrency"],
		},
		{
			title: "Online Test",
			period: "Nov 2024 – Feb 2025",
			desc: "Platform supporting customizable exams, time limits, auto-grading, and analytics.",
			responsibilities: [
				"Engineered real-time exam progress tracker and cheating prevention protocols.",
				"Designed a randomized question bank generator with strict categorization.",
			],
			tags: ["NestJS", "NextJS", "PostgreSQL", "WebSockets", "Redis"],
		},
		{
			title: "Warehouse Management",
			period: "Nov 2023 – Oct 2024",
			desc: "Asynchronous logistics management hub tracking import/export movements and stock levels.",
			responsibilities: [
				"Architected event-driven listeners to handle goods dispatch logs and maintenance hooks.",
				"Optimized queries to update real-time stock levels across multi-site warehouses.",
			],
			tags: ["Go", "Gin", "Kafka", "Prisma", "PostgreSQL", "Redis"],
		},
		{
			title: "Online Payment (Boost Malaysia)",
			period: "Jul 2022 – Oct 2023",
			desc: "Digital wallet solution for Malaysian merchants to receive cross-app e-wallet and bank payments.",
			responsibilities: [
				"Integrated third-party payment gateways (Paynet, Gkash).",
				"Ensured high availability and PCI compliance metrics during transaction processing.",
			],
			tags: ["Go", "NestJS", "TypeORM", "AWS", "Docker", "Kafka"],
		},
	];

	// Skills Data
	const skillGroups = [
		{
			category: "Languages",
			items: [
				"Go (Golang)",
				"TypeScript",
				"JavaScript",
				"Rust",
				"Java",
				"HTML",
				"CSS / Tailwind",
			],
		},
		{
			category: "Frameworks",
			items: [
				"NestJS",
				"SvelteKit",
				"Spring Boot",
				"Gin",
				"Echo",
				"Axum",
				"NextJS",
				"HonoJS",
			],
		},
		{
			category: "Databases & Message Queues",
			items: [
				"PostgreSQL",
				"MongoDB",
				"Redis",
				"Kafka",
				"NATS",
				"Prisma ORM",
				"TypeORM",
			],
		},
		{
			category: "DevOps & Architectures",
			items: [
				"Docker",
				"Kubernetes",
				"AWS",
				"Alibaba Cloud",
				"GitHub Actions",
				"Jenkins",
				"Clean Architecture",
				"SOLID",
			],
		},
	];
</script>

<!-- Hero Section -->
<section
	id="about"
	class="relative py-12 md:py-20 flex flex-col items-center text-center max-w-4xl mx-auto reveal-on-scroll"
>
	<h1
		class="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight pb-2"
	>
		Bui Thanh Luan (Lucas)
	</h1>

	<p
		class="mt-4 text-xl md:text-2xl font-semibold text-brand-purple dark:text-brand-cyan"
	>
		Middle Backend Engineer & Team Lead
	</p>

	<p
		class="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl"
	>
		Backend-focused Software Engineer with over 3 years of experience in
		high-performance system development, particularly using <strong
			>TypeScript</strong
		>, <strong>Go</strong>, and <strong>Rust</strong>. I design scalable,
		type-safe APIs, deploy cloud-native architectures, and automate delivery
		pipelines.
	</p>

	<!-- Expected Salary capsule -->
	<div
		class="mt-6 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold glass-panel text-slate-700 dark:text-slate-200 border-brand-cyan/20 shadow-md"
	>
		<span class="text-brand-cyan">💰</span>
		<span
			>Expected Salary: <strong
				class="text-brand-purple dark:text-brand-cyan font-extrabold"
				>$1000 - $1200 NET</strong
			></span
		>
	</div>

	<!-- Quick info & Contacts grid -->
	<div
		class="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300"
	>
		<a
			href="mailto:luanbt21@gmail.com"
			class="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:text-brand-cyan select-none interactive-element"
		>
			<svg
				class="w-4 h-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
			luanbt21@gmail.com
		</a>
		<a
			href="tel:0966006367"
			class="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:text-brand-cyan select-none interactive-element"
		>
			<svg
				class="w-4 h-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
				/>
			</svg>
			0966006367
		</a>
		<a
			href="https://github.com/luanbt21"
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:text-brand-cyan select-none interactive-element"
		>
			<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
				<path
					fill-rule="evenodd"
					d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
					clip-rule="evenodd"
				/>
			</svg>
			GitHub
		</a>
		<span
			class="flex items-center gap-2 px-4 py-2 rounded-full glass-panel select-none"
		>
			<svg
				class="w-4 h-4 text-brand-purple"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
			Hanoi, Vietnam
		</span>
	</div>
</section>

<!-- Featured Side Project Section -->
<section
	id="side-project"
	class="py-12 border-t border-white/10 dark:border-white/5 reveal-on-scroll"
>
	<div class="text-center mb-12">
		<h2
			class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
		>
			Featured Side Project
		</h2>
		<p class="mt-2 text-slate-500 dark:text-slate-400">
			Innovative interactive lineage web platform
		</p>
	</div>

	<div
		class="glass-panel rounded-3xl p-6 md:p-8 spotlight-card border-white/20 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center"
	>
		<div class="flex-1 space-y-4">
			<div class="flex items-center gap-2">
				<span
					class="bg-brand-cyan/20 text-brand-cyan dark:text-brand-cyan text-xs font-semibold px-2.5 py-1 rounded-full"
					>Web App</span
				>
				<span
					class="bg-brand-purple/20 text-brand-purple dark:text-brand-purple text-xs font-semibold px-2.5 py-1 rounded-full"
					>Interactive SVG</span
				>
			</div>

			<h3 class="text-2xl font-bold text-slate-900 dark:text-white">
				Interactive Family Tree Mapping
			</h3>

			<p
				class="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
			>
				An elegant, high-performance web platform built to map and traverse
				large family lineages. It features fluid navigation controls, instant
				search-to-node focus, and responsive connecting nodes with customized
				responsive drawing layouts.
			</p>

			<div class="flex flex-wrap gap-2 pt-2">
				<span
					class="text-xs px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 border border-white/10 font-mono text-slate-600 dark:text-slate-300"
					>SvelteKit</span
				>
				<span
					class="text-xs px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 border border-white/10 font-mono text-slate-600 dark:text-slate-300"
					>SVG Paths</span
				>
				<span
					class="text-xs px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 border border-white/10 font-mono text-slate-600 dark:text-slate-300"
					>TailwindCSS</span
				>
				<span
					class="text-xs px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 border border-white/10 font-mono text-slate-600 dark:text-slate-300"
					>Cloudflare Pages</span
				>
				<span
					class="text-xs px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 border border-white/10 font-mono text-slate-600 dark:text-slate-300"
					>Cloudflare D1</span
				>
			</div>

			<div class="pt-4">
				<a
					href="https://family-tree.luanbt.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-brand-cyan to-brand-purple text-white font-semibold text-sm hover:shadow-lg hover:shadow-brand-cyan/20 hover:scale-105 transition-all select-none interactive-element"
				>
					Visit family-tree.luanbt.com
					<svg
						class="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
				</a>
			</div>
		</div>

		<!-- Interactive representation visual of the tree -->
		<div
			class="w-full md:w-72 h-48 md:h-64 rounded-2xl bg-black/10 dark:bg-white/5 border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none"
		>
			<!-- Mini background drawing representation -->
			<svg
				class="absolute inset-0 w-full h-full opacity-30 dark:opacity-20"
				fill="none"
				viewBox="0 0 288 220"
			>
				<path
					d="M 144 20 C 144 80, 72 80, 72 140 M 144 20 C 144 80, 216 80, 216 140 M 72 140 L 72 200 M 216 140 L 216 200"
					stroke="currentColor"
					stroke-width="2"
				/>
			</svg>

			<div class="z-10 flex flex-col items-center gap-2">
				<div
					class="p-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan"
				>
					<svg
						class="w-8 h-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>
				</div>
				<span class="text-sm font-semibold text-slate-800 dark:text-slate-200"
					>Interactive Lineage Graph</span
				>
				<span class="text-xs text-slate-500 dark:text-slate-400"
					>Auto-organizing layout engine</span
				>
			</div>
		</div>
	</div>
</section>

<!-- Work Experience (Timeline) Section -->
<section
	id="experience"
	class="py-12 border-t border-white/10 dark:border-white/5"
>
	<div class="text-center mb-12 reveal-on-scroll">
		<h2
			class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
		>
			Work Experience
		</h2>
		<p class="mt-2 text-slate-500 dark:text-slate-400">
			Over 3 years of engineering high-concurrency API platforms
		</p>
	</div>

	<!-- Relative Timeline wrapper -->
	<div
		id="experience-timeline"
		class="relative max-w-4xl mx-auto pl-8 md:pl-12"
	>
		<!-- SVG Draw Line connecting events -->
		<div class="absolute left-[7px] md:left-[11px] top-4 bottom-4 w-1 -z-10">
			<svg class="w-full h-full" preserveAspectRatio="none" fill="none">
				<!-- Background Line -->
				<line
					x1="2"
					y1="0"
					x2="2"
					y2="100%"
					stroke="rgba(139, 92, 246, 0.15)"
					stroke-width="3"
					stroke-linecap="round"
				/>
				<!-- Animated overlay Line -->
				<path
					bind:this={svgPath}
					class="svg-draw-path"
					d="M 2 0 L 2 10000"
					stroke="url(#gradient-accent)"
					stroke-width="3"
					stroke-linecap="round"
				/>

				<defs>
					<linearGradient id="gradient-accent" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stop-color="#06b6d4" />
						<stop offset="100%" stop-color="#8b5cf6" />
					</linearGradient>
				</defs>
			</svg>
		</div>

		<!-- Swantech Section -->
		<div class="relative mb-16 reveal-on-scroll">
			<!-- Marker node -->
			<div
				class="absolute left-[-31px] md:left-[-39px] top-1.5 w-5 h-5 rounded-full bg-[#060814] border-2 border-brand-cyan flex items-center justify-center shadow-lg"
			>
				<div class="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping"></div>
			</div>

			<div class="glass-card rounded-2xl p-6 border-white/20 spotlight-card">
				<div
					class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5"
				>
					<div>
						<h3 class="text-xl font-bold text-slate-900 dark:text-white">
							Middle Backend Engineer (Team Lead)
						</h3>
						<p
							class="text-sm font-semibold text-brand-purple dark:text-brand-cyan"
						>
							Swantech Technology., JSC
						</p>
					</div>
					<span
						class="text-xs font-semibold px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple dark:text-brand-cyan border border-brand-cyan/20"
					>
						Mar 2025 – May 2026
					</span>
				</div>
				<ul
					class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside"
				>
					<li>
						<strong>Monorepo Engineering:</strong> Designed and implemented a Typescript-based
						monorepo (Turbo/pnpm), increasing microservice scaling rate and dropping
						integrations overhead by 40%.
					</li>
					<li>
						<strong>Database Reliability:</strong> Designed relational structures
						using Prisma, utilizing PostgreSQL indexes to scale up transaction throughput
						and query benchmarks.
					</li>
					<li>
						<strong>Governance & SOLID:</strong> Implemented Clean Architecture templates
						and strict TypeScript interfaces, driving down technical debt by 30%.
					</li>
					<li>
						<strong>Team Governance:</strong> Structured tasks and held peer code
						reviews for a 3-person engineering pod, conducting daily knowledge-sharing.
					</li>
				</ul>
				<div class="mt-4 flex flex-wrap gap-1.5">
					{#each ["Turbo Monorepo", "Pnpm", "HonoJS", "Prisma", "PostgreSQL", "Go", "Kafka", "Docker"] as tech}
						<span
							class="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-300 border border-white/10"
							>{tech}</span
						>
					{/each}
				</div>
			</div>
		</div>

		<!-- Song Phan Section -->
		<div class="relative mb-16 reveal-on-scroll">
			<div
				class="absolute left-[-31px] md:left-[-39px] top-1.5 w-5 h-5 rounded-full bg-[#060814] border-2 border-brand-purple flex items-center justify-center shadow-lg"
			>
				<div class="w-1.5 h-1.5 rounded-full bg-brand-purple"></div>
			</div>

			<div class="glass-card rounded-2xl p-6 border-white/20 spotlight-card">
				<div
					class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5"
				>
					<div>
						<h3 class="text-xl font-bold text-slate-900 dark:text-white">
							Full Stack Engineer (Go & TS)
						</h3>
						<p
							class="text-sm font-semibold text-brand-purple dark:text-brand-cyan"
						>
							Song Phan Technology., JSC
						</p>
					</div>
					<span
						class="text-xs font-semibold px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple dark:text-brand-cyan border border-brand-purple/20"
					>
						Nov 2023 – Feb 2025
					</span>
				</div>
				<ul
					class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside"
				>
					<li>
						<strong>API Concurrency:</strong> Engineered optimized REST endpoints
						with Go (Gin), integrating Context configurations to trace requests and
						streamline error logs.
					</li>
					<li>
						<strong>Data Modelling:</strong> Maintained highly normalized schemas
						via Prisma ORM, implementing relational logic for consistency between
						app servers and database stores.
					</li>
					<li>
						<strong>TDD Quality Control:</strong> Established core unit test structures,
						securing over 80% code coverage across transaction systems.
					</li>
				</ul>
				<div class="mt-4 flex flex-wrap gap-1.5">
					{#each ["NestJS", "Prisma", "Go", "Gin", "PostgreSQL", "Redis", "Kafka", "Docker"] as tech}
						<span
							class="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-300 border border-white/10"
							>{tech}</span
						>
					{/each}
				</div>
			</div>
		</div>

		<!-- CMC Global Section -->
		<div class="relative reveal-on-scroll">
			<div
				class="absolute left-[-31px] md:left-[-39px] top-1.5 w-5 h-5 rounded-full bg-[#060814] border-2 border-slate-500 flex items-center justify-center shadow-lg"
			>
				<div class="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
			</div>

			<div class="glass-card rounded-2xl p-6 border-white/20 spotlight-card">
				<div
					class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5"
				>
					<div>
						<h3 class="text-xl font-bold text-slate-900 dark:text-white">
							Backend Developer
						</h3>
						<p
							class="text-sm font-semibold text-brand-purple dark:text-brand-cyan"
						>
							CMC Global Company Limited
						</p>
					</div>
					<span
						class="text-xs font-semibold px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple dark:text-brand-cyan border border-white/10"
					>
						Jun 2022 – Oct 2023
					</span>
				</div>
				<ul
					class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside"
				>
					<li>
						<strong>Concurrency Migration:</strong> Shifted legacy synchronous workloads
						to Go Goroutines and Channels, accelerating execution speeds.
					</li>
					<li>
						<strong>Cloud Infrastructure:</strong> Containerized applications with
						multi-stage Docker configurations and coordinated services in Kubernetes
						clusters.
					</li>
					<li>
						<strong>Telemetry Observability:</strong> Integrated DataDog and OpenTelemetry
						parameters into AWS microservices for proactive status monitoring and
						profiling.
					</li>
				</ul>
				<div class="mt-4 flex flex-wrap gap-1.5">
					{#each ["Go", "Gin", "NestJS", "TypeScript", "TypeORM", "DataDog", "AWS", "Kubernetes", "Jenkins"] as tech}
						<span
							class="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-300 border border-white/10"
							>{tech}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects Showcase Grid -->
<section
	id="projects"
	class="py-12 border-t border-white/10 dark:border-white/5"
>
	<div class="text-center mb-12 reveal-on-scroll">
		<h2
			class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
		>
			Other Projects
		</h2>
		<p class="mt-2 text-slate-500 dark:text-slate-400">
			Production systems engineered for academic, logistics, and fintech
			platforms
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
		{#each projects as project}
			<div
				class="glass-card rounded-2xl p-6 border-white/20 spotlight-card flex flex-col justify-between reveal-on-scroll"
			>
				<div>
					<div class="flex justify-between items-start gap-1">
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">
							{project.title}
						</h3>
						<span class="text-[10px] font-semibold text-slate-400 shrink-0"
							>{project.period}</span
						>
					</div>
					<p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
						{project.desc}
					</p>

					<ul
						class="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside"
					>
						{#each project.responsibilities as resp}
							<li>{resp}</li>
						{/each}
					</ul>
				</div>

				<div class="mt-6 flex flex-wrap gap-1">
					{#each project.tags as tag}
						<span
							class="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-cyan/5 text-brand-cyan dark:text-brand-cyan border border-brand-cyan/10"
							>{tag}</span
						>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Skills Catalog -->
<section id="skills" class="py-12 border-t border-white/10 dark:border-white/5">
	<div class="text-center mb-12 reveal-on-scroll">
		<h2
			class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
		>
			Skills Catalog
		</h2>
		<p class="mt-2 text-slate-500 dark:text-slate-400">
			Core technologies and architectural competencies
		</p>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
		{#each skillGroups as group}
			<div
				class="glass-panel rounded-2xl p-6 border-white/20 spotlight-card reveal-on-scroll"
			>
				<h3
					class="text-md font-bold text-slate-900 dark:text-slate-100 border-b border-white/10 dark:border-white/5 pb-2 mb-4"
				>
					{group.category}
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each group.items as skill}
						<span
							class="text-xs px-3 py-1.5 rounded-full bg-white/40 dark:bg-slate-950/20 text-slate-700 dark:text-slate-200 font-semibold border border-white/15 dark:border-white/5 shadow-sm transition-all hover:border-brand-cyan/30 hover:scale-105 duration-200"
						>
							{skill}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
