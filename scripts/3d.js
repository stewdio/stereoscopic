



document.addEventListener( 'DOMContentLoaded', function(){

	for( var i = 0; i < 60; i ++ ){

		var 
		pair   = document.createElement( 'div' ),
		lefty  = document.createElement( 'div' ),
		righty = document.createElement( 'div' )

		pair.classList.add( 'pair' )
		pair.style.left = rangeRandom( -5, 105 ) +'%'
		pair.style.top  = rangeRandom( -5, 105 ) +'%'

		lefty.classList.add( 'lefty' )
		lefty.innerHTML = i
		pair.appendChild( lefty )

		righty.classList.add( 'righty' )
		righty.innerHTML = i	
		pair.appendChild( righty )

		document.body.appendChild( pair )
	}




	Array.prototype.shuffle = function(){

		var 
		copy = this,
		i = this.length, 
		j,
		tempi,
		tempj

		if( i == 0 ) return false
		while( -- i ){

			j = Math.floor( Math.random() * ( i + 1 ))
			tempi = copy[ i ]
			tempj = copy[ j ]
			copy[ i ] = tempj
			copy[ j ] = tempi
		}
		return copy
	}




	function rangeRandom( a, b ){

		var min, max

		if( b !== undefined ){

			min = Math.min( a, b )
			max = Math.max( a, b )
			return min + Math.random() * ( max - min )
		}
		else if( a !== undefined ){

			return Math.random() * b
		}
		else return Math.random()
	}
	function rangeRand( a, b ){

		return Math.floor( rangeRandom )
	}




	var 
	elements = Array.prototype.slice.call( document.body.querySelectorAll( '.pair' )),
	elementsSelected = [],
	elementsSelectedMax = 3000,
	element, e,
	intensity = 100,// 1 to 100?
	gain = 1


	elements = elements.shuffle()
	for( e = 0; e < Math.min( elements.length, elementsSelectedMax ); e ++ ){

		element = elements[ e ]
		element.parentNode.style.perspective = '600px'
		element.parentNode.style[ '-webkit-perspective' ] = '600px'

		element.setAttribute( 'theta-multiplier-a', rangeRandom( 0.5, Math.PI ))
		element.setAttribute( 'theta-multiplier-b', rangeRandom( 0.5, Math.PI ))
		element.setAttribute( 'theta-multiplier-c', rangeRandom( 0.5, Math.PI ))

		element.setAttribute( 'amplitude-multiplier-a', intensity * rangeRandom( 2, 6 ))
		element.setAttribute( 'amplitude-multiplier-b', intensity * rangeRandom( 2, 6 ))
		element.setAttribute( 'amplitude-multiplier-c', intensity * rangeRandom( 2, 9 ) / 2 )
		
		element.setAttribute( 'theta', rangeRandom( 0, Math.PI * 2 ))
		element.setAttribute( 'delta', rangeRandom( 0, Math.PI ))

		if( e < elementsSelectedMax ){

			elementsSelected.push( element )
		}
	}




	function loop(){

		if( gain < 1 ) gain += 0.001
		else gain = 1

		elementsSelected.forEach( function( element ){

			var 
			t = +element.getAttribute( 'theta' ),
			d = +element.getAttribute( 'delta' ),
			a = +element.getAttribute( 'theta-multiplier-a' ),
			b = +element.getAttribute( 'theta-multiplier-b' ),
			c = +element.getAttribute( 'theta-multiplier-c' ),
			A = +element.getAttribute( 'amplitude-multiplier-a' ),
			B = +element.getAttribute( 'amplitude-multiplier-b' ),
			C = +element.getAttribute( 'amplitude-multiplier-c' ),
			x, y, z,
			lefty  = element.querySelector( '.lefty' ),
			righty = element.querySelector( '.righty' ),
			translation

			t += 0.002
			element.setAttribute( 'theta', t )


			//  Lissajous curve
			
			x = gain * A * Math.sin( t * a + d )
			y = gain * B * Math.sin( t * b )
			z = gain * C * Math.sin( t * c )
			
			translation = 'translate3d('+ x +'px,'+ y +'px,'+ z +'px)'
			element.style.transform = translation
			element.style[ '-webkit-transform' ] = translation
			element.style[ '-o-transform' ] = translation
			lefty.style.left  = ( -z / 60 ) + 'px'
			righty.style.left = (  z / 60 ) + 'px'
		})
	}
	loop()
	setInterval( loop, 10 )




})