
function createAnalytics() : object {
    let counter: number = 0
    let destroyed: boolean = false


    const listener = (): number => counter++

    document.addEventListener('click', listener)

    return {
        destroy() {
            destroyed = true
        },

        getClick() : any {
            if(destroyed) {
                return `Destroyed ${counter}`
            }
            return counter
        }
    }
}


window['analytics'] = createAnalytics()
