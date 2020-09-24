class Tile {
    constructor(strokeColor, fillColor, shadowColor) {
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.shadowColor = shadowColor;
    }

    Draw(context, x, y) {
        context.shadowBlur = 20;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowColor = this.shadowColor;

        context.fillStyle = this.fillColor;
        context.strokeStyle = this.strokeColor;

        let cornerRadius = 0.17;
        let rectWidth = 0.9;
        let rectHeight = 0.9;
        let rectX = x + 0.05;
        let rectY = y + 0.05;

        context.lineJoin = "round";
        context.lineWidth = cornerRadius;

        context.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
        context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    }
}