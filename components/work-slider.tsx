'use client';

import Image from 'next/image';
import {useRef,useState} from 'react';

const work=[
  {src:'/projects/apex11.jpeg',title:'Floating stair balustrade',category:'Interior balustrade'},
  {src:'/projects/apex20.jpeg',title:'Curved pool enclosure',category:'Pool fencing'},
  {src:'/projects/apex21.jpeg',title:'Architectural pool fencing',category:'Pool fencing'},
  {src:'/projects/apex12.jpeg',title:'Elevated outdoor balustrade',category:'Glass balustrade'},
  {src:'/projects/apex23.jpeg',title:'Brass-hinged shower enclosure',category:'Shower screen'},
  {src:'/projects/apex19.jpeg',title:'Custom walk-in shower',category:'Shower screen'},
  {src:'/projects/apex14.jpeg',title:'Poolside stair balustrade',category:'Glass balustrade'},
  {src:'/projects/apex18.jpeg',title:'Corner shower enclosure',category:'Shower screen'},
  {src:'/projects/apex15.jpeg',title:'Black-detail shower screens',category:'Shower screen'},
  {src:'/projects/apex13.jpeg',title:'Coastal boundary balustrade',category:'Glass balustrade'},
  {src:'/projects/apex16.jpeg',title:'Frameless corner shower',category:'Shower screen'},
  {src:'/projects/apex17.jpeg',title:'Bath and shower enclosure',category:'Shower screen'},
] as const;

export function WorkSlider(){
  const track=useRef<HTMLDivElement>(null);
  const drag=useRef({active:false,startX:0,startScroll:0});
  const [active,setActive]=useState(0);
  const move=(direction:number)=>{const el=track.current;if(!el)return;const cards=el.querySelectorAll<HTMLElement>('.workSlide');const step=cards[1]?cards[1].offsetLeft-cards[0].offsetLeft:(cards[0]?.offsetWidth??el.clientWidth);el.scrollBy({left:direction*step,behavior:'smooth'});};
  const update=()=>{const el=track.current;const cards=el?.querySelectorAll<HTMLElement>('.workSlide');if(!el||!cards?.length)return;const step=cards[1]?cards[1].offsetLeft-cards[0].offsetLeft:cards[0].offsetWidth;setActive(Math.min(work.length-1,Math.max(0,Math.round(el.scrollLeft/step))));};
  const startDrag=(event:React.PointerEvent<HTMLDivElement>)=>{if(event.pointerType==='mouse'&&event.button!==0)return;const el=track.current;if(!el)return;drag.current={active:true,startX:event.clientX,startScroll:el.scrollLeft};el.setPointerCapture(event.pointerId);el.classList.add('isDragging');};
  const continueDrag=(event:React.PointerEvent<HTMLDivElement>)=>{if(!drag.current.active||!track.current)return;event.preventDefault();track.current.scrollLeft=drag.current.startScroll-(event.clientX-drag.current.startX);};
  const stopDrag=(event:React.PointerEvent<HTMLDivElement>)=>{const el=track.current;if(!el||!drag.current.active)return;drag.current.active=false;if(el.hasPointerCapture(event.pointerId))el.releasePointerCapture(event.pointerId);el.classList.remove('isDragging');update();};
  return <section className="workShowcase section" id="projects" aria-labelledby="work-title">
    <div className="shell workShowcaseHead">
      <div><div className="eyebrow">Selected installations · 01—12</div><h2 className="sectionTitle" id="work-title">Previous work,<br/><span className="serif">clearly considered.</span></h2></div>
      <div className="workControls"><span className="workCounter" aria-live="polite">{String(active+1).padStart(2,'0')} / {String(work.length).padStart(2,'0')}</span><button type="button" onClick={()=>move(-1)} disabled={active===0} aria-label="View previous project">←</button><button type="button" onClick={()=>move(1)} disabled={active===work.length-1} aria-label="View next project">→</button></div>
    </div>
    <div className="workTrack" ref={track} onScroll={update} onPointerDown={startDrag} onPointerMove={continueDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag} tabIndex={0} aria-label="Previous project gallery">
      {work.map((item,index)=><figure className="workSlide" key={item.src}>
        <div className="workSlideImage"><Image src={item.src} alt={item.title} fill sizes="(max-width: 700px) 84vw, (max-width: 1200px) 66vw, 760px" draggable={false}/></div>
        <figcaption><span>{String(index+1).padStart(2,'0')}</span><div><strong>{item.title}</strong><small>{item.category}</small></div></figcaption>
      </figure>)}
    </div>
    <div className="shell workHint">Drag, swipe or use the arrows to explore</div>
  </section>;
}
