import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logowithoutbg.png'
import { Button, User } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import menuManage from '../../ultils/menuManage'

const { AiOutlinePlusCircle, ImExit, FiLogIn, FiUserPlus, PiHeartStraight, SiCodeblocks } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isShowMenu, setIsShowMenu] = useState(false)

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [navigate])
    const goCreatePost = () => {
        navigate('/he-thong/tao-moi-bai-dang'); // Đường dẫn đến trang đăng tin mới
    };

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page')])


    return (
        <div ref={headerRef} className='w-3/5'>
            <div className='w-full flex items-center justify-between'>
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[240px] h-[70px] object-contain'
                    />
                </Link>
                {/* Navigation */}
                <nav className='flex items-center gap-6'>
                    <div className='flex items-center gap-1'>
                        {!isLoggedIn && (
                            <div className='flex items-center gap-1'>
                                <FiLogIn />
                                <Button
                                    text={'Đăng nhập'}
                                    textColor='text-gray-700'
                                    bgColor='hover:bg-gray-200'
                                    px='px-2'
                                    py='py-2'
                                    onClick={() => goLogin(false)}
                                />
                                <FiUserPlus />
                                <Button
                                    text={'Đăng ký'}
                                    textColor='text-gray-700'
                                    bgColor='hover:bg-gray-200'
                                    px='px-2'
                                    py='py-2'
                                    onClick={() => goLogin(true)}
                                />
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className='flex items-center gap-2 relative'>
                                <User />
                                <PiHeartStraight />
                                <Link to="/yeu-thich" className='text-gray-700 hover:text-blue-600'>Yêu thích</Link>
                                <Button
                                    text={'Quản lý tài khoản'}
                                    textColor='text-gray-700'
                                    bgColor='hover:bg-gray-200'
                                    px='px-2'
                                    py='py-2'
                                    onClick={() => setIsShowMenu(prev => !prev)}
                                    IcBefore={SiCodeblocks}
                                />
                                {isShowMenu && (
                                    <div className='absolute z-30 min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col mt-1'>
                                        {menuManage.map(item => (
                                            <Link
                                                className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2'
                                                key={item.id}
                                                to={item?.path}
                                            >
                                                {item?.icon}
                                                {item.text}
                                            </Link>
                                        ))}
                                        <span
                                            className='cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2'
                                            onClick={() => {
                                                setIsShowMenu(false)
                                                dispatch(actions.logout())
                                            }}
                                        >
                                            <ImExit />
                                            Đăng xuất
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                        <Button
                            text={'Đăng tin mới'}
                            textColor='text-white'
                            bgColor='bg-secondary2'
                            IcAfter={AiOutlinePlusCircle}
                            onClick={goCreatePost}
                        />
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header
