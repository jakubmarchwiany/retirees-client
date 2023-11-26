"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider(): JSX.Element {
	return (
		<Toaster
			containerStyle={{ marginBottom: "40px" }}
			gutter={10}
			position="bottom-center"
			toastOptions={{
				style: {
					maxWidth: "500px"
				}
			}}
		/>
	);
}
