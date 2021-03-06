USE [activity_18_03_22]
GO
SET IDENTITY_INSERT [dbo].[roles] ON 

INSERT [dbo].[roles] ( [code], [rank]) VALUES ( N'SUPER_ADMIN', 1)
INSERT [dbo].[roles] ( [code], [rank]) VALUES ( N'ADMIN', 2)
INSERT [dbo].[roles] ( [code], [rank]) VALUES ( N'USER', 3)
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ( [email], [enabled], [name], [otp_code], [password], [username]) VALUES ( N'bakwaas1652@scdhn.com', 1, N'Nguyễn Sỹ Bảo', NULL, N'$2a$10$K55kZxx3HreNZTUYysRl9OvXN2wbKfebJu5Pr75S8EAlHAiMRmueK', N'camelot123456')
SET IDENTITY_INSERT [dbo].[users] OFF
GO
SET IDENTITY_INSERT [dbo].[user_role] ON 

INSERT [dbo].[user_role] ( [id_role], [id_user]) VALUES ( 1, 1)
SET IDENTITY_INSERT [dbo].[user_role] OFF
GO
SET IDENTITY_INSERT [dbo].[carts] ON 

INSERT [dbo].[carts] ([id], [modified_at], [total_price], [total_quantity], [id_user], [created_at]) VALUES (1, NULL, NULL, 0, 2, NULL)
SET IDENTITY_INSERT [dbo].[carts] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ( [avatar_url], [currency_code], [name], [price], [stock]) VALUES ( N'https://images.pexels.com/photos/108059/pexels-photo-108059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', N'USD', N'Chuối', 5, 100)
INSERT [dbo].[products] ( [avatar_url], [currency_code], [name], [price], [stock]) VALUES ( N'https://images.pexels.com/photos/175728/pexels-photo-175728.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', N'USD', N'Dâu', 8, 100)
INSERT [dbo].[products] ( [avatar_url], [currency_code], [name], [price], [stock]) VALUES ( N'https://images.unsplash.com/photo-1437275418715-2def52829d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTI4NzN8MHwxfGNvbGxlY3Rpb258NDd8Mjg4OTI2fHx8fHwyfHwxNjMzMTQyNzU2&ixlib=rb-1.2.1&q=80&w=400', N'USD', N'Cam', 7, 100)
INSERT [dbo].[products] ( [avatar_url], [currency_code], [name], [price], [stock]) VALUES ( N'https://cdn.barnimages.com/wp-content/uploads/2018/04/20171226-barnimages-008-770x513.jpg', N'USD', N'Mận', 4, 100)
INSERT [dbo].[products] ( [avatar_url], [currency_code], [name], [price], [stock]) VALUES ( N'http://static.everypixel.com/ep-libreshot/0263/9673/2636/03728/2639673263603728688.jpg', N'USD', N'Kiwi', 5, 100)
INSERT [dbo].[products] ( [avatar_url], [currency_code], [name], [price], [stock]) VALUES ( N'https://images.unsplash.com/photo-1443243548054-7680d2008866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTI4NzN8MHwxfGNvbGxlY3Rpb258Mzd8MjAxMzYxfHx8fHwyfHwxNjM4MjQ3ODE1&ixlib=rb-1.2.1&q=80&w=400', N'USD', N'Đào', 4, 100)
SET IDENTITY_INSERT [dbo].[products] OFF
GO

