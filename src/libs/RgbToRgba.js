const RgbToRgba = (rgb, a) => {

    return rgb.replace(/rgb/i, "rgba").replace(/\)/i,`,${a})`)

}

export default RgbToRgba;