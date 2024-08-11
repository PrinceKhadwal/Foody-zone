import React from 'react'

const Item = ({data}) => {
  return (
    <>
      <section className="bg-[url('../../public/bg.png')] w-screen min-h-screen px-40 py-20">
        <div className='flex justify-center items-center gap-6 flex-wrap'>
          {
            data?.map(({image, text, name, price},index) => (
              <div key={index} className=' text-white w-96 flex justify-center items-center border rounded-2xl p-5 backdrop-blur'>
                <div className='basis-2/5' >
                  <img src={`http://localhost:9000${image}`} alt='image' className='rounded-full' />
                </div>
                <div className='flex flex-col basis-3/5'>
                  <h1 className='font-semibold text-xl'>{name}</h1>
                  <p className=''>{text}</p>
                  <span className='bg-red-600 border rounded p-1 my-1 self-end'>${price}</span>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Item