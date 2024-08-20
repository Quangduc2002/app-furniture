import React from 'react';

function HomeMap() {
  return (
    <div id='map' className='h-[450px]'>
      <iframe
        className='w-full'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d932.7971648143149!2d105.87148043532217!3d20.743146089316024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b5e3c9c99c79%3A0x3d0fce91d17c1a46!2zUFZWQys4WDUsIMSQ4bqhaSBOZ2hp4buHcCwgUGjDuiBYdXnDqm4sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1716365150372!5m2!1svi!2sus'
        height='450'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  );
}

export default HomeMap;
