const getColor = (colors, colorId) => {
    return colors
        .find(color => color.id === colorId)
}

export default getColor;