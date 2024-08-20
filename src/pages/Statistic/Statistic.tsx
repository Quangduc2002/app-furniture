import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import clsx from 'clsx';
import { motion, spring } from 'framer-motion';
import 'chart.js/auto';
import styles from './Statistic.module.scss';
import CountUp from 'react-countup';
import Bars from '@/components/Bars/Bars';
import { Months, Years } from '@/utils/FormatDate';
import { Icon } from '@/components/UI/IconFont/Icon';
import { useRequest } from 'ahooks';
import {
  serviceBill,
  serviceChartStatistic,
  serviceCustomer,
  serviceIncome,
  serviceStatistic,
  serviceStatusWait,
} from './sevice';
import { Result, Row, Table } from 'antd';
import { FormatPrice } from '@/utils/FormatPrice';

type RevenuaCard = Array<{
  title: string;
  start: number;
  end: number;
  Icon: () => void;
}>;

function Statistic() {
  const [menu, setMenu] = useState(false);
  const [listStatistic, setListStatistic] = useState([]);
  const [bill, setBill] = useState<any>([]);
  const [incomes, setIncomes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [statusWait, setStatusWait] = useState<any>([]);
  const [methodStatistic, setMethodStatistic] = useState('');
  const [month, setMonth] = useState('');
  const [precious, setPrecious] = useState('');
  const [year, setYear] = useState(Years[0]);
  const [chartStatistics, setChartStatistics] = useState([]);
  const [currentPage, setCurrentPage] = useState<any>(1);

  const data = {
    labels: Months?.map((month: any) => `Tháng ${month}`),
    datasets: [
      {
        label: 'Tổng tiền',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: chartStatistics.map((chartStatistic: any) => chartStatistic.total),
      },
    ],
  };

  useRequest(serviceBill, {
    onSuccess: (res) => {
      setBill(res.data);
    },
  });

  useRequest(serviceCustomer, {
    onSuccess: (res) => {
      setCustomers(res.data);
    },
  });

  useRequest(serviceStatusWait, {
    onSuccess: (res) => {
      setStatusWait(res.data);
    },
  });

  useRequest(serviceIncome, {
    onSuccess: (res) => {
      const sumIcom = res.data.reduce((sum: any, item: any) => sum + item?.OrderItems?.donGia, 0);
      setIncomes(sumIcom);
    },
  });

  const { run: runChart } = useRequest(serviceChartStatistic, {
    manual: true,
    onSuccess: (res: any) => {
      setChartStatistics(res.data);
    },
  });

  useEffect(() => {
    runChart(year);
  }, []);

  const handleChartStatistics = () => {
    runChart(year);
  };

  const { run: runSatitistic } = useRequest(serviceStatistic, {
    // manual: true,
    onSuccess: (res) => {
      setListStatistic(res.data);
    },
  });

  const handleStatistics = () => {
    runSatitistic({
      methodStatistic: methodStatistic,
      month: month,
      year: year,
      precious: precious,
    });
  };

  const revenuaCard: RevenuaCard = [
    {
      title: 'thu nhập',
      start: 0,
      end: incomes,
      Icon: () => <Icon className='text-[#6777ef]' icon='icon-calendar-solid' />,
    },
    {
      title: 'bán hàng',
      start: 0,
      end: bill,
      Icon: () => <Icon className='text-[#66bb6a]' icon='icon-cart' />,
    },
    {
      title: 'khách hàng',
      start: 0,
      end: customers?.length,
      Icon: () => <Icon className='text-[#3abaf4]' icon='icon-users' />,
    },
    {
      title: 'chờ giải quyết',
      start: 0,
      end: statusWait,
      Icon: () => <Icon className='text-[#ffa426]' icon='icon-comments' />,
    },
  ];

  const columns = [
    {
      title: 'STT',
      dataIndex: 'ID',
      key: 'key',
      render: (text: any, record: any, index: number) => (
        <strong>{(currentPage - 1) * 10 + index + 1}</strong>
      ),
    },
    {
      title: 'tên sản phẩm',
      dataIndex: 'tenSp',
      key: 'name',
    },
    {
      title: 'ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (value: any) => (
        <img
          className={clsx(styles.table_image, 'mx-auto')}
          src={`http://localhost:3000/Images/${value}`}
          alt=''
        />
      ),
    },
    {
      title: 'kích thước',
      dataIndex: 'kichThuoc',
      key: 'size',
    },
    {
      title: 'số lượng',
      dataIndex: 'totalQuantity',
      key: 'quantity',
    },
    {
      title: 'tổng tiền',
      dataIndex: 'donGia',
      key: 'totalPrice',
      render: (_: any, record: any) => (
        <Row wrap={false} align={'middle'} justify={'end'}>
          {FormatPrice.format(record.donGia)}&nbsp;VND
        </Row>
      ),
    },
  ];

  return (
    <div className={clsx(styles.revenue)}>
      <Bars setMenu={setMenu} menu={menu} />

      <motion.div
        initial={{ y: '4rem', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          type: spring,
        }}
      >
        <div
          className={clsx(
            styles.revenue_card,
            'grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 flex-row gap-4 flex-wrap ',
          )}
        >
          {revenuaCard?.map((it: any, index: number) => (
            <div key={index} className={clsx(styles.revenue_card__body)}>
              <div>
                <p className={clsx(styles.revenue_card__title)}>{it.title}</p>
                <CountUp
                  start={it.start}
                  end={it.end}
                  suffix={it.title === 'thu nhập' ? ' VND' : ''}
                  className={clsx(styles.revenue_card__number)}
                ></CountUp>
              </div>
              <div>{it.Icon()}</div>
            </div>
          ))}
        </div>

        <div className={clsx(styles.revenue__PD, 'overflow-hidden overflow-x-scroll')}>
          <div>
            <div className='flex gap-3 my-6'>
              <select
                onChange={(e) => setYear(e.target.value)}
                className='py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm '
              >
                <option className='hidden'>--Chọn hành động--</option>
                {Years.map((Year: any, index: number) => (
                  <option key={index} value={Year}>
                    {Year}
                  </option>
                ))}
              </select>
              <button
                onClick={handleChartStatistics}
                className=' rounded-md py-1.5 px-3 text-white bg-[#ee4d2d] hover:bg-[#c52432]'
              >
                Thống kê
              </button>
            </div>
            <Line className='w-full mb-10' data={data} />
          </div>

          <div className='my-5 '>
            <div>
              <p>Chọn phương thức thống kê:</p>
              <div className='flex justify-between flex-wrap gap-3 mt-2'>
                <div className='flex flex-wrap gap-3 '>
                  <select
                    onChange={(e) => setMethodStatistic(e.target.value)}
                    className='py-2 px-2 xxs:w-auto xs:w-full  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm '
                  >
                    <option className='hidden'>--Chọn hành động--</option>
                    <option value={'Tất cả sản phẩm'}>Tất cả sản phẩm</option>
                    <option value={'Sản phẩm đã bán theo quý'}>Sản phẩm đã bán theo quý</option>
                    <option value={'Sản phẩm đã bán trong tháng'}>
                      Sản phẩm đã bán trong tháng
                    </option>
                  </select>
                  <button
                    onClick={handleStatistics}
                    className='lg:block xs:hidden rounded-md py-1.5 px-3 text-white bg-[#ee4d2d] hover:bg-[#c52432]'
                  >
                    Thống kê
                  </button>
                </div>

                {methodStatistic === 'Sản phẩm đã bán trong tháng' ? (
                  <div className='flex gap-3 flex-wrap'>
                    <select
                      onChange={(e) => setMonth(e.target.value)}
                      className='py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm '
                    >
                      <option className='hidden'>Chọn tháng</option>
                      {Months.map((month: any, index: number) => (
                        <option key={index} value={month}>
                          tháng {month}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => setYear(e.target.value)}
                      className='py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm '
                    >
                      <option className='hidden'>Chọn năm</option>
                      {Years.map((Year: any, index: number) => (
                        <option key={index} value={Year}>
                          {Year}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : methodStatistic === 'Sản phẩm đã bán theo quý' ? (
                  <div className='flex gap-3 flex-wrap'>
                    <select
                      onChange={(e) => setPrecious(e.target.value)}
                      className='py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm '
                    >
                      <option className='hidden'>Chọn quý</option>
                      <option value={1}>Qúy 1</option>
                      <option value={2}>Qúy 2</option>
                      <option value={3}>Qúy 3</option>
                      <option value={4}>Qúy 4</option>
                    </select>
                    <select
                      onChange={(e) => setYear(e.target.value)}
                      className='py-2 px-2  focus:ring focus:border-gray-300 outline-none block border border-gray-200 rounded-lg text-sm '
                    >
                      <option className='hidden'>Chọn năm</option>
                      {Years.map((Year: any, index: number) => (
                        <option key={index} value={Year}>
                          {Year}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div>
              <button
                // onClick={handleStatistics}
                className='mt-2 xs:block lg:hidden rounded-md py-1.5 px-3 text-white bg-[#ee4d2d] hover:bg-[#c52432]'
              >
                Thống kê
              </button>
            </div>
          </div>

          <Table
            dataSource={listStatistic || []}
            columns={listStatistic.length > 0 ? columns : []}
            locale={{
              emptyText: (
                <Result
                  icon={
                    <img
                      src={'/svg/NoFile.svg'}
                      alt='Empty Data'
                      className='w-[148px] h-[160px] m-auto'
                    />
                  }
                  title='Chưa có thông tin'
                />
              ),
            }}
            pagination={
              listStatistic?.length > 10
                ? {
                    total: listStatistic?.length || 0,
                    pageSize: 10,
                    align: 'center',
                  }
                : false
            }
            onChange={(e) => setCurrentPage(e?.current)}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Statistic;
