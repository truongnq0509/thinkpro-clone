import type { RouteObject } from "react-router";

// private router
import PrivateRouter from "~/layouts/private";
// client
import { DefaultLayout } from "~/layouts/client/DefaultLayout";
import { LayoutProfile } from "~/layouts/client/LayoutProfile";
import { HomePage } from "~/pages/client/Home";
import { CollectionPage } from "~/pages/client/Collection";
import { SkuPage } from "~/pages/client/Sku";
import { NotFoundPage } from "~/pages/client/NotFound";
import { LoginPage } from "~/pages/client/Login";
import { RegisterPage } from "~/pages/client/Register";
import { SearchPage } from "~/pages/client/Search";
import { VerifyPage } from "~/pages/client/Verify";
import { SendEmailPage } from "~/pages/client/SendEmail";
import { ResetPasswordPage } from "~/pages/client/ResetPassword";
import { ProfilePage } from "~/pages/client/Profile";
import { ChangePasswordPage } from "~/pages/client/ChangePassword";

// admin
import { AdminLayout } from "~/layouts/admin/AdminLayout";
import { DashboardPage } from "~/pages/admin/Dashboard";
import {
	DefaultProductPage,
	ProductManagerPage,
	AddProductPage,
	StoreProductPage,
	UpdateProductPage,
} from "~/pages/admin/Products";

const routes: RouteObject[] = [
	{
		path: "/dang-nhap",
		element: <LoginPage />,
	},
	{
		path: "/dang-ky",
		element: <RegisterPage />,
	},
	{
		path: "/xac-minh/:state",
		element: <VerifyPage />,
	},
	{
		path: "/quen-mat-khau",
		element: <SendEmailPage />,
	},
	{
		path: "/reset-mat-khau",
		element: <ResetPasswordPage />,
	},
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "tim-kiem",
				element: <SearchPage />,
			},
			{
				path: "/tai-khoan",
				element: <LayoutProfile />,
				children: [
					{
						path: "profile",
						element: <ProfilePage />,
					},
					{
						path: "mat-khau",
						element: <ChangePasswordPage />,
					},
				],
			},
			{
				path: ":slug",
				children: [
					{
						index: true,
						element: <CollectionPage />,
					},
					{
						path: ":slug",

						element: <SkuPage />,
					},
				],
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "/admin",
		element: (
			<PrivateRouter roles={["editor", "admin"]}>
				<AdminLayout />
			</PrivateRouter>
		),
		children: [
			{
				index: true,
				element: <DashboardPage />,
			},
			{
				path: "products",
				element: <DefaultProductPage />,
				children: [
					{
						index: true,
						element: <ProductManagerPage />,
					},
					{
						path: "create",
						element: <AddProductPage />,
					},
					{
						path: "store",
						element: <StoreProductPage />,
					},
					{
						path: ":slug",
						element: <UpdateProductPage />,
					},
				],
			},
		],
	},
];

export default routes;
