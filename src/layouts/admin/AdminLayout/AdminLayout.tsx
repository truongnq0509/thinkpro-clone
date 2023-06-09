import type { MenuProps } from "antd";
import { Avatar, Input, Layout, Menu, Space } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbBrandCake } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.scss";

const { Content, Sider, Header } = Layout;

const cx = classNames.bind(styles);

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuProps["items"] = [
	getItem(<NavLink to="/admin">Dashboard</NavLink>, "1", <AiOutlineHome size="18px" />),
	getItem(<NavLink to="/admin/products">Sản phẩm</NavLink>, "2", <BsPhone size="18px" />),
	getItem(<NavLink to="/admin/categories">Danh mục</NavLink>, "3", <BiCategoryAlt size="18px" />),
	getItem(<NavLink to="/admin/brands">Thương hiệu</NavLink>, "4", <TbBrandCake size="18px" />),
	getItem(<NavLink to="/admin/orders">Đơn hàng</NavLink>, "5", <CiShoppingCart size="18px" />),
	getItem(<NavLink to="/">Đăng xuất</NavLink>, "6", <AiOutlineLogout size="18px" />),
];

const AdminLayout: React.FC = () => {
	return (
		<Layout
			style={{
				display: "flex",
				minHeight: "100vh",
			}}
		>
			<Layout>
				<Sider
					width="240"
					style={{
						backgroundColor: "white",
						overflow: "auto",
						height: "100vh",
						position: "fixed",
						left: 0,
						top: 0,
						bottom: 0,
					}}
				>
					<div className={cx("logo")}>
						<img
							src="https://media-api-beta.thinkpro.vn/media/core/site-configs/2023/3/16/logo-thinkpro.svg"
							alt="logo"
						/>
					</div>
					<Menu
						mode="inline"
						defaultSelectedKeys={["1"]}
						defaultOpenKeys={["sub1"]}
						style={{
							border: "none",
						}}
						className={cx("nav")}
						items={items}
					/>
				</Sider>
				<Layout
					style={{ padding: "0 48px 24px 24px", minHeight: "100vh", background: "#f6f9fc", marginLeft: 240 }}
				>
					<Header
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "0",
							height: "90px",
							backgroundColor: "transparent",
						}}
					>
						<div className={cx("search")}>
							<span className={cx("icon")}>
								<FiSearch />
							</span>
							<Input
								placeholder="Search"
								className={cx("input")}
							/>
						</div>
						<Space split="|">
							<Space>
								<Avatar
									style={{ objectFit: "cover", verticalAlign: "middle" }}
									size="large"
									src="https://haycafe.vn/wp-content/uploads/2022/11/Hinh-anh-don-gian.jpg"
								/>
								<span>Truong Nguyen</span>
							</Space>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
								<IoIosNotificationsOutline size="24px" />
							</div>
						</Space>
					</Header>
					<Outlet />
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
