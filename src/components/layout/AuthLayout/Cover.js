import React, { cloneElement } from 'react'
import Logo from 'components/template/Logo'
import { APP_NAME } from 'constants/app.constant'

const Cover = ({ children, content, ...rest }) => {
    return (
        <div className="grid lg:grid-cols-7 h-full">
            <div className="flex col-span-3 flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>
            </div>
            <div
                className="col-span-4 bg-no-repeat bg-cover py-6 px-16 flex-col justify-between bg-white dark:bg-gray-800 hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-cover-bg.jpg')`,
                }}
            >
                <Logo mode="dark" />
                <div>
                    <h3 className="text-white mb-4">Olivia Rhye</h3>
                    <p className="text-lg text-white opacity-80 max-w-[700px]">
                        “We’ve been using Untitled to kick start every new
                        project and can’t imagine working without it.”
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>
        </div>
    )
}

export default Cover
