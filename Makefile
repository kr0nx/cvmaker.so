#!/bin/bash
BUILD=build
FILENAME=cv

html:
	pandoc ${FILENAME}.md \
    --from=markdown+tex_math_single_backslash+tex_math_dollars \
    --to=html5 \
	--toc \
	--output=${FILENAME}.html \
	--css=pandoc.css \
    --mathjax \
	--standalone \
	
    
	
		
