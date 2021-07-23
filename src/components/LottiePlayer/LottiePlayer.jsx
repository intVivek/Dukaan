import React, { useEffect, useRef } from 'react';

import LottieWeb from 'lottie-web';

const Lottie = (props) => {
	const lottieRef = useRef(),
		lottieAnim = useRef(),

		onClick = () => {
			if (lottieAnim.current.isPaused) {
				return lottieAnim.current.play();
			}

			lottieAnim.current.pause();
		};

	useEffect(() => {
		if (!props.pause) {
			return lottieAnim?.current?.pause();
		}

		return lottieAnim?.current?.play();
	}, [props.pause]);

	useEffect(() => {
		if (lottieRef?.current?.children.length > 0) return;

		const {
			loop = true,
			autoplay = true,
			segments = false,
			animationData,
			rendererSettings = {}
		} = props ?? {};

		if (!animationData) {
			throw new Error('Animation data is required');
		}

		lottieAnim.current = LottieWeb.loadAnimation({
			loop,
			autoplay,
			segments,
			animationData,
			renderer: 'svg',
			container: lottieRef.current,
			rendererSettings: {
				...rendererSettings,
				preserveAspectRatio: 'xMidYMid slice',
				className: `${props.className.trim().replace(/ .*/, '')}SVG`
			}
		});
		props.speed && lottieAnim.current.setSpeed(props.speed);
	}, [props]);

	let classList = 'lottie ';
	props.className && (classList += `${props.className.trim()} `);
	props.clickToPause && (classList += 'clickToPause ');

	return props.show === false
		? null
		: <div className={classList} ref={lottieRef} onClick={props.clickToPause ? onClick : null} />;
};

export default Lottie;
