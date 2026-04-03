<script lang="ts">
	import { onMount } from 'svelte';

	let {
		items,
		onStop
	}: { items: { id: string; name: string; value: number }[]; onStop?: (name: string) => void } =
		$props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let spinning = $state(false);
	let angle = 0;
	let angularVelocity = 0;
	const friction = 0.99;
	const stopThreshold = 0.0005;

	export const spin = (speed?: number) => {
		if (spinning) return;
		spinning = true;
		angularVelocity = speed ?? Math.random() * 0.2 + 0.25;
		animate();
	};

	const draw = () => {
		if (!ctx || !canvas) return;
		const { width, height } = canvas;
		const centerX = width / 2;
		const centerY = height / 2;
		const radius = Math.min(centerX, centerY) - 10;
		const sliceAngle = (Math.PI * 2) / items.length;

		ctx.clearRect(0, 0, width, height);

		items.forEach((item, i) => {
			const startAngle = angle + i * sliceAngle;
			const endAngle = startAngle + sliceAngle;

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.fillStyle = `hsl(${(360 / items.length) * i}, 80%, 60%)`;
			ctx.fill();
			ctx.strokeStyle = '#2c3e50';
			ctx.lineWidth = 2;
			ctx.stroke();

			ctx.save();
			ctx.translate(centerX, centerY);
			ctx.rotate(startAngle + sliceAngle / 2);
			ctx.textAlign = 'right';
			ctx.fillStyle = 'white';
			ctx.font = 'bold 14px sans-serif';
			ctx.shadowBlur = 4;
			ctx.shadowColor = 'rgba(0,0,0,0.5)';
			const displayName = item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name;
			ctx.fillText(displayName, radius - 20, 5);
			ctx.restore();
		});

		ctx.beginPath();
		ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
		ctx.fillStyle = '#2c3e50';
		ctx.fill();
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 3;
		ctx.stroke();
	};

	const animate = () => {
		if (angularVelocity > stopThreshold) {
			angle += angularVelocity;
			angularVelocity *= friction;
			draw();
			requestAnimationFrame(animate);
		} else if (spinning) {
			spinning = false;
			angularVelocity = 0;

			const totalSlices = items.length;
			const sliceSize = (Math.PI * 2) / totalSlices;

			let localPointerAngle = (-Math.PI / 2 - angle) % (Math.PI * 2);
			if (localPointerAngle < 0) localPointerAngle += Math.PI * 2;

			const winningIndex = Math.floor(localPointerAngle / sliceSize) % totalSlices;
			const winner = items[winningIndex].name;

			if (onStop) {
				onStop(winner);
			} else {
				setTimeout(() => {
					alert(`You landed on ${winner}!`);
				}, 100);
			}
		}
	};

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		draw();
	});
</script>

<div class="relative flex flex-col items-center justify-center p-4">
	<div class="relative">
		<div
			class="absolute -top-4 left-1/2 z-10 h-0 w-0 -translate-x-1/2 border-x-[15px] border-t-[30px] border-x-transparent border-t-red-600 drop-shadow-lg"
		></div>

		<canvas
			bind:this={canvas}
			width="300"
			height="300"
			class="rounded-full border-[8px] border-slate-700 bg-white shadow-xl"
		></canvas>
	</div>
</div>
