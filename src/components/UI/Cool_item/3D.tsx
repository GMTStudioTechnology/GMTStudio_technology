import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextItemProps {
  y: number;
  children: string;
  addToRefs: (el: SVGTextElement | null) => void;
}

const TextItem: React.FC<TextItemProps> = ({ y, children, addToRefs }) => {
  return <text ref={addToRefs} y={y}>{children}</text>;
};

const CodeDrivenAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftGroupRef = useRef<SVGGElement>(null);
  const rightGroupRef = useRef<SVGGElement>(null);
  const textRefs = useRef<SVGTextElement[]>([]);

  // Clear refs on re-render
  useEffect(() => {
    textRefs.current = [];
  }, []);

  useEffect(() => {
    if (!leftGroupRef.current || !rightGroupRef.current || textRefs.current.length === 0) return;

    // First timeline - group animations
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        yoyo: true,
        ease: 'power2.inOut'
      }
    })
    .fromTo([leftGroupRef.current, rightGroupRef.current], {
      svgOrigin: '640 500',
      skewY: (i: number) => [-30, 15][i],
      scaleX: (i: number) => [0.6, 0.85][i],
      x: 200
    }, {
      skewY: (i: number) => [-15, 30][i],
      scaleX: (i: number) => [0.85, 0.6][i],
      x: -200
    })
    .play(0.5);

    // Second timeline - text animations
    const tl2 = gsap.timeline();
    
    textRefs.current.forEach((t, i) => {
      tl2.add(
        gsap.fromTo(t, {
          xPercent: -100,
          x: 700
        }, {
          duration: 1,
          xPercent: 0,
          x: 575,
          ease: 'sine.inOut'
        }),
        i % 3 * 0.2
      );
    });

    // Pointer move event handler
    const handlePointerMove = (e: PointerEvent) => {
      tl.pause();
      tl2.pause();
      gsap.to([tl, tl2], {
        duration: 2,
        ease: 'power4',
        progress: e.clientX / window.innerWidth
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      tl.kill();
      tl2.kill();
    };
  }, []);

  // Function to add text elements to the refs array
  const addToRefs = (el: SVGTextElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const textContent = ['CODE', 'DRIVEN', 'ANIMATION'];
  const yPositions = [120, 250, 380];

  return (
    <div className="bg-black w-full h-screen overflow-hidden font-montserrat font-black">
      <svg ref={svgRef} viewBox="0 0 1280 720" className="w-full h-screen">
        <defs>
          <mask id="maskLeft">
            <rect x="-50%" width="100%" height="100%" fill="#fff" />
          </mask>
          <mask id="maskRight">
            <rect x="50%" width="100%" height="100%" fill="#fff" />
          </mask>
        </defs>
        <g fontSize="150">
          <g ref={leftGroupRef} mask="url(#maskLeft)" fill="#fff" className="left">
            {textContent.map((text, i) => (
              <TextItem 
                key={`left-${text}`} 
                y={yPositions[i]} 
                addToRefs={addToRefs}
              >
                {text}
              </TextItem>
            ))}
          </g>
          <g ref={rightGroupRef} mask="url(#maskRight)" fill="#aaa" className="right">
            {textContent.map((text, i) => (
              <TextItem 
                key={`right-${text}`} 
                y={yPositions[i]} 
                addToRefs={addToRefs}
              >
                {text}
              </TextItem>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CodeDrivenAnimation;