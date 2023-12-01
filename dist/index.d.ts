import { Options } from "use-canvas-image";
interface ImageGbcOptions extends Options {
    tolerance: number;
}
interface ImageGbc {
    (src: string | HTMLImageElement | typeof Image | HTMLCanvasElement | CanvasImageSource, options?: Partial<ImageGbcOptions>): Promise<Array<{
        r: number;
        g: number;
        b: number;
        a: number;
        rgba: string;
        x: number;
        y: number;
        index: number;
        isStart: boolean;
        isEnd: boolean;
        lng: number;
        key: number;
        canvasWidth: number;
        canvasHeight: number;
        max: number;
    }>>;
}
export declare const imageGbc: ImageGbc;
export default imageGbc;
