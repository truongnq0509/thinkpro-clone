import { Button, Col, Modal, Row, Space, Table, Tag, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import classNames from "classnames/bind";
import moment from "moment";
import React, { useState } from "react";
import { AiFillInfoCircle, AiOutlineDelete } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { Link, useOutletContext } from "react-router-dom";
import { IProduct } from "~/interfaces";
import { formatNumber } from "~/utils/fc";
import styles from "./Products.module.scss";
import { getProducts as apiGetProducts } from "~/services/productService";

const { confirm } = Modal;

type Props = {};
const cx = classNames.bind(styles);

const Products: React.FC = (props: Props) => {
	const [{ products, count, handleRemoveProduct, paginate, emitData, loading }] = useOutletContext<any>();

	const showDeleteConfirm = (id: string) => {
		confirm({
			title: "Bạn có muốn xóa không?",
			icon: (
				<AiFillInfoCircle
					size="32px"
					color="#ffec99"
				/>
			),
			content: "Hành động này không ảnh hưởng đến ...",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			style: {},
			onOk() {
				handleRemoveProduct(id);
			},
		});
	};

	const columns: ColumnsType<IProduct> = [
		{
			title: "#",
			dataIndex: "index",
			key: "#",
			render: (text, record, index) => index + 1,
		},
		{
			title: "Tên sản phẩm",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Giá",
			dataIndex: "price",
			key: "price",
			render: (value) => {
				return `${formatNumber(`${value}`)} VNĐ`;
			},
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (value: string) => {
				return moment(value).format("DD/MM/YYYY HH:ss:mm");
			},
		},
		{
			title: "Ngày cập nhật",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (value: string) => {
				return moment(value).format("DD/MM/YYYY HH:ss:mm");
			},
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (value: number) => {
				return (
					<Tag
						bordered={false}
						color={!value ? "#0abb871a" : "#fd397a1a"}
						className={cx("tag")}
					>
						<span
							style={{
								color: !value ? "#0abb87" : "#fd397a",
							}}
						>
							{!value ? "active" : "disabled"}
						</span>
					</Tag>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			render: (_, product) => (
				<Space size="middle">
					<Button
						style={{
							color: "#fd397a",
							backgroundColor: "#fd397a1a",
							border: "none",
						}}
						className={cx("btn")}
						onClick={() => showDeleteConfirm(product._id as string)}
					>
						Xóa
					</Button>
					<Button
						style={{
							color: "#228be6",
							backgroundColor: "#228be61a",
							border: "none",
						}}
						className={cx("btn")}
					>
						<Link to={`/admin/products/${product?.slug}`}>Cập Nhật</Link>
					</Button>
				</Space>
			),
		},
	];

	return (
		<div className={cx("wrapper", "wrapper--active")}>
			<Row
				gutter={[0, 0]}
				style={{ padding: "16px 0 8px 0" }}
			>
				<Col
					span="12"
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Space align="end">
						<h2 className={cx("title")}>Tất Cả Sản Phẩm</h2>
					</Space>
				</Col>
				<Col
					span="12"
					style={{
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<Space split="|">
						<Button
							className={cx("btn")}
							icon={<IoAddOutline />}
							size="middle"
							style={{
								color: "#0abb87",
								backgroundColor: "#0abb871a",
								border: "none",
							}}
						>
							<Link to="/admin/products/create">Thêm Mới</Link>
						</Button>
						<Button
							className={cx("btn")}
							icon={<AiOutlineDelete />}
							size="middle"
							style={{
								color: "#fd397a",
								backgroundColor: "#fd397a1a",
								border: "none",
							}}
						>
							<Link to="/admin/products/store">Thùng Rác{`(${count})`}</Link>
						</Button>
					</Space>
				</Col>
			</Row>
			<Table
				loading={loading}
				columns={columns}
				dataSource={products as IProduct[]}
				pagination={{
					pageSize: paginate?.limit,
					total: paginate?.totalDocs,
					showSizeChanger: false,
					onChange: async (page) => {
						const { data } = await apiGetProducts(10, "desc", "createdAt", page);
						emitData(data);
					},
				}}
				rowKey={"_id"}
				style={{
					marginTop: "16px",
				}}
			/>
		</div>
	);
};

export default Products;
