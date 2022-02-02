#!/bin/bash

html:
	pandoc ${markdown} \
    --from=markdown+tex_math_single_backslash+tex_math_dollars \
    --to=html5 \
	--toc \
	-H resume-css-stylesheet.css \
    --mathjax \
	--standalone \
	
    
	
		
