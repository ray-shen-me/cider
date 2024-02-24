/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.txt$/,
            type: "asset/source",
            // exclude: /node_modules/,
            // use: ['raw-loader']
        })
        return config
    },
};

export default nextConfig;
