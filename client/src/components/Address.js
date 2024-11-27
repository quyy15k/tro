import React, { memo, useEffect, useState } from 'react';
import { Select, InputReadOnly, Input } from '../components';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../services';
import { useSelector } from 'react-redux';

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
    const { dataEdit } = useSelector(state => state.post);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState(''); // Thêm state cho tên đường
    const [reset, setReset] = useState(false);

    useEffect(() => {
        if (dataEdit?.address) {
            let addressArr = dataEdit.address.split(',');
            let foundProvince = provinces?.length > 0 && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1]?.trim());
            setProvince(foundProvince ? foundProvince.province_id : '');
        }
    }, [dataEdit, provinces]);

    useEffect(() => {
        if (dataEdit?.address) {
            let addressArr = dataEdit.address.split(',');
            let foundDistrict = districts?.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2]?.trim());
            setDistrict(foundDistrict ? foundDistrict.district_id : '');
        }
    }, [dataEdit, districts]);

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces(response?.data.results);
            }
        };
        fetchPublicProvince();
    }, []);

    useEffect(() => {
        setDistrict('');
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            if (response.status === 200) {
                setDistricts(response.data?.results);
            }
        };
        if (province) {
            fetchPublicDistrict();
        }
        setReset(!province); // Cập nhật trạng thái reset
        if (!province) {
            setDistricts([]);
        }
    }, [province]);

    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${street ? `${street}, ` : ''}${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
            province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
        }));
    }, [province, district, street]); // Cập nhật street

    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố' />
                    <Select setInvalidFields={setInvalidFields} invalidFields={invalidFields} reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện' />
                </div>
                <Input
                    label='Địa chỉ cụ thể'
                    value={street}
                    setValue={setStreet}
                    name='street'
                    unit=''
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    small='gồm(số, Đường/Phố, Phường/Xã)'
                />
                <InputReadOnly
                    label='Địa chỉ chính xác'
                    value={`${street ? `${street}, ` : ''}${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}
                />
            </div>
        </div>
    );
};

export default memo(Address);
