import useCanvasImage,{Options} from "use-canvas-image"
import arePointsCollinear from "./arePointsCollinear"
import simplifyDouglasPeucker from "./simplifyDouglasPeucker"
import {get} from "lodash"
interface ImageGbcOptions extends Options {
    tolerance:number
}
interface ImageGbc {
    (src:string | HTMLImageElement | typeof Image | HTMLCanvasElement | CanvasImageSource, options?:Partial<ImageGbcOptions>):Promise<Array<{
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
    }>>
}
export const imageGbc:ImageGbc = async function (src,options){
    const pxs = []
    const pxsMap = new Map()
    await useCanvasImage(src, e=>{
        pxs.push(e)
        pxsMap.set([e.x, e.y].join(), e)
    },options as Options)
    const getZwPx = (x:number, y:number)=> [
        [x-1,y-1],
        [x,y-1],
        [x+1,y-1],
        [x-1,y],
        [x+1,y],
        [x-1,y+1],
        [x,y+1],
        [x+1,y+1],
    ]
    const isBJ = ({x, y, canvasWidth, canvasHeight, a}:any)=>{
        return getZwPx(x,y).some(e=>pxsMap.get(e.join())?.a === 0) || (a !== 0 && (y === 0 || x === 0 || x === canvasWidth-1 || y === canvasHeight-1))
    }
    const pxsResultsMap = new Map()
    const pxsResults =  pxs.filter(e=>{
        if(e.a !== 0 && isBJ(e)){
            pxsResultsMap.set([e.x, e.y].join(), e)
            return true
        }
    })
    const pxsLine = []
    const pxsLineMap = new Map()
    let curr = null
    const calcNextCurr = (e)=>{
        const {x, y} = e
        const ps = getZwPx(x,y).map(e=>pxsResultsMap.get(e.join())).filter(e=>e && !pxsLineMap.get([e.x, e.y].join()))
        return ps[0] || e
    }
    pxsResults.forEach((e,k)=>{
        if(k === 0){
            curr = e
        }else {
            curr = calcNextCurr(curr)
        }
        if(curr){
            pxsLine.push(curr)
            pxsLineMap.set([curr.x, curr.y].join(), curr)
        }
    })
    //todo 精简坐标-直线算法
    const newPxsLine = []
    let dots = []
    pxsLine.forEach((e,k)=>{
        if(dots.length < 3){
            dots.push(e)
        }else {
            if(arePointsCollinear(dots.map(e=>[e.x, e.y]))){
                dots.push(e)
            }else {
                newPxsLine.push.apply(newPxsLine, dots.slice(0,dots.length - 1))
                dots = [dots.pop()]
            }
        }
    })
    const tolerance = get(options, 'tolerance', 0.1)
    return simplifyDouglasPeucker(newPxsLine, tolerance)
}

export default imageGbc
