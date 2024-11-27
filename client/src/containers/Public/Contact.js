import React, { useState } from 'react'
import { Button, InputForm } from '../../components'
import Swal from 'sweetalert2'

const Contact = () => {
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    content: '',
  })
  const handleSubmit = () => {
    Swal.fire(`Cảm ơn${payload.name ? payload.name : ''}`, 'Phản hồi của bạn đã dược chúng tôi ghi nhận', 'success').then(() => {
      setPayload({
        name: '',
        phone: '',
        content: '',
      })
    })
  }
  return (
    <div>
      <div className='w-full'>
        <h1 className='text-2xl font-semibold mb-6'>Liên hệ với chúng tôi</h1>
        <div className='flex gap-4'>
          <div className='flex-1 flex flex-col gap-4 h-fit bg-red-400 rounded-3xl p-4 text-white bg-gradient-to-br from-blue-700 to-cyan-400'>
            <h4>Thông tin liên hệ</h4>
            <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.com</span>
            <span>Điện thoại: 0917686101</span>
            <span>cskh.phongtro123@gmail.com</span>
            <span>Zalo: 0917686101</span>
            <span>Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam</span>
          </div>
          <div className='flex-1 bg-white show-md round-md p-4 mb-6' >
            <h4 className='front-medium text-lg mb-4'>Liên hệ trực tuyến</h4>
            <div className='flex flex-col gap-6'>
              <InputForm label='HỌ VÀ TÊN CỦA BẠN' value={payload.name} setValue={setPayload} keyPayload='name' />
              <InputForm label='SỐ ĐIỆN THOẠI' value={payload.phone} setValue={setPayload} keyPayload='phone' />
              <div>
                <label htmlFor="desc" className='block mb-2'></label>
                <textarea
                  id="desc"
                  className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full resize-none"
                  value={payload.content}
                  onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
                  name='content'
                  cols="30"
                  rows="4"
                  placeholder="Vui lòng nhập nội dung liên hệ của bạn...">
                </textarea>
              </div>
              <Button
                text='Gửi liên hệ'
                bgColor='bg-blue-500'
                textColor='text-white'
                fullWidth
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact