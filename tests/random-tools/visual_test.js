const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const points = [];

context.fillRect(0, 250, 500, 1);
context.fillRect(250, 0, 1, 500);

context.fillStyle = "rgba(255,0,0,0.2)";
for(let i = 0; i < 1000; i++){
	context.fillRect(
		RandomTools.getNormal(250, 100),
		RandomTools.getNormal(250, 100),
		3,
		3
	)
}
