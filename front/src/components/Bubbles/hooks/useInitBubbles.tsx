import {useEffect, useState} from 'react'
import useWindowSize from "$hooks/useWindowSize";


const defaultHeight = 350
const paddingVertical = 32
const headerHeight = 28

const getBubbles = () => {
    return document.querySelector('.bubble-chart')
}

const getBubbleChart = async () => {
    return new Promise(resolve => {
        const intervalId = setInterval(() => {
            const bubbleChart= document.querySelector('.bubble-chart')
            if (bubbleChart) {
                console.log(bubbleChart)
                resolve(bubbleChart)
                clearInterval(intervalId)
            }
        }, 1000)
    })
}

const useInitBubbles = (innerWidth, innerHeight, bubblesWrapRef) => {

    const [loaded,setLoaded] = useState(false);

    useEffect(() => {
        const scriptTag = document.createElement('script')

        scriptTag.src = 'assets/bubbleCode.js'
        scriptTag.id = `bubbles`
        document.head.appendChild(scriptTag)
        scriptTag.onload = () => {
            setLoaded(true);
            window.dispatchEvent(new Event('load'));
        }
        const cssLink1 = document.createElement('link')

        cssLink1.rel = 'stylesheet'
        cssLink1.href = 'assets/bubbleStyles.css'
        document.head.appendChild(cssLink1)

        const cssLink2 = document.createElement('link')

        cssLink2.rel = 'stylesheet'
        cssLink2.href = 'assets/reset.css'
        document.head.appendChild(cssLink2)

    }, [])

    useEffect(() => {
        if(!loaded) return;
        const width = bubblesWrapRef?.current?.getBoundingClientRect?.()?.height || defaultHeight
        const block1 = document.getElementById('bubbles-app')
        // const block2 = document.getElementById('top-sellers')

        // const bubbles= getBubbles()

        if (block1 && block1.style) {
            block1.style.height = `${width / 2.14}px`

            setTimeout(() => {
                block1.style.height = `${(width / 2.14) + 24}px`
            }, 100)
        }

    }, [loaded,innerWidth, innerHeight, bubblesWrapRef])

    useEffect(() => {
        if(!loaded) return;
        (async () => {
            const height = bubblesWrapRef?.current?.getBoundingClientRect?.()?.height || defaultHeight

            const currentBubbleHeight = height - (paddingVertical + headerHeight)

            const bubbleChart = await getBubbleChart()

            if (bubbleChart) {
                const bubbles= getBubbles()

                if (bubbles && bubbles.style) {
                    bubbles.style.height = `${currentBubbleHeight}px`
                }
            }


            // bubbleCart?.style?.height = `${currentBubbleHeight}px`
        })()
    }, [loaded,innerWidth, innerHeight, bubblesWrapRef])
}

export default useInitBubbles
