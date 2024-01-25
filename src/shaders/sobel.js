import {
	Vector2,
    Vector3
} from 'three';

/**
 * Sobel Edge Detection (see https://youtu.be/uihBwtPIBxM)
 *
 * As mentioned in the video the Sobel operator expects a grayscale image as input.
 *
 */

const SobelOperatorShader = {

	name: 'SobelOperatorShader',

	uniforms: {

		'tNormal': { value: null },
		'tDiffuse': { value: null },
		'resolution': { value: new Vector2() },
        'threshold': { value: 1 },
        'lineColor': { value: new Vector3(0, 0, 0)},
        'lightPosition': { value: new Vector3(0, 0, 0)},
        'cameraPos': { value: new Vector3(0, 0, 0)},
        'waveAmplitude': { value: 0.0005 },
        'waveFrequency': { value: 100.0 },
	},

	vertexShader: /* glsl */`
	uniform vec3 cameraPos; // Add uniform for camera position
	varying vec2 vUv;
	varying float vCameraDistance;


	void main() {
		vUv = uv;
		
		// Calculate distance from the camera to the vertex
		vCameraDistance = distance(cameraPos, position);

		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tNormal;
		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
        uniform float threshold;
        uniform vec3 lineColor;
        uniform float waveAmplitude;
        uniform float waveFrequency;
		varying float vCameraDistance;

		varying vec2 vUv;

		void main() {

            vec2 texel = vec2(1.0 / resolution.x, 1.0 / resolution.y);
            vec2 noisyUv = vUv + vec2(sin(vUv.y * waveFrequency) * waveAmplitude, sin(vUv.x * waveFrequency) * waveAmplitude * 2.0);

		// kernel definition (in glsl matrices are filled in column-major order)

			const mat3 Gx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 ); // x direction kernel
			const mat3 Gy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 ); // y direction kernel

		// fetch the 3x3 neighbourhood of a fragment

		// first column

			vec3 tx0y0 = texture2D( tNormal, noisyUv + texel * vec2( -1, -1 ) ).rgb;
			vec3 tx0y1 = texture2D( tNormal, noisyUv + texel * vec2( -1,  0 ) ).rgb;
			vec3 tx0y2 = texture2D( tNormal, noisyUv + texel * vec2( -1,  1 ) ).rgb;

		// second column

			vec3 tx1y0 = texture2D( tNormal, noisyUv + texel * vec2(  0, -1 ) ).rgb;
			vec3 tx1y1 = texture2D( tNormal, noisyUv + texel * vec2(  0,  0 ) ).rgb;
			vec3 tx1y2 = texture2D( tNormal, noisyUv + texel * vec2(  0,  1 ) ).rgb;

		// third column

			vec3 tx2y0 = texture2D( tNormal, noisyUv + texel * vec2(  1, -1 ) ).rgb;
			vec3 tx2y1 = texture2D( tNormal, noisyUv + texel * vec2(  1,  0 ) ).rgb;
			vec3 tx2y2 = texture2D( tNormal, noisyUv + texel * vec2(  1,  1 ) ).rgb;

		// gradient value in x direction

        vec3 valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
               Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
               Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

        vec3 valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
                    Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
                    Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;


		// magnitute of the total gradient

            float G = sqrt( dot(valueGx, valueGx) + dot(valueGy, valueGy) );

			// gl_FragColor = vec4( vec3( G ), 1 );

		// Modify the threshold based on camera distance
			float distanceBasedThreshold = threshold * (1.0 + vCameraDistance / 25.0);

			if (G > distanceBasedThreshold) {
				gl_FragColor = vec4(lineColor, 1);
			} else {
				gl_FragColor = texture2D(tDiffuse, vUv);
			}
		}`

};

export { SobelOperatorShader };
