import { walletConnect, coinbaseWallet, injected } from "wagmi/connectors";
import { createConfig } from "wagmi";
import { base } from "viem/chains";
import { authConnector } from "@web3modal/wagmi";
import { http } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

// Pastikan projectId sudah benar
const projectId = "65e900325f6440b81073eb1b10270843";
if (!projectId) {
  console.error("Error: Project ID is undefined");
  throw new Error("Project ID is undefined");
} else {
  console.log(`Project ID is: ${projectId}`);
}

// Definisikan metadata Web3Modal
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

console.log("Metadata for Web3Modal:", metadata);

// Definisikan jaringan yang digunakan
const chains = [base];
console.log("Using chains:", chains);

// Buat konektor untuk wallet
const connectors = [
  walletConnect({ projectId, metadata, showQrModal: true }),
  injected({ shimDisconnect: true }),
  coinbaseWallet({
    appName: metadata.name,
    appLogoUrl: metadata.icons[0],
  }),
  authConnector({
    options: { projectId },
    socials: ['google', 'x', 'github', 'discord', 'apple'],
    showWallets: true,
    email: true,
    walletFeatures: false,
  })
];

// Log connectors yang dibuat
console.log("Wallet connectors:", connectors);

// Konfigurasi wagmi
const wagmiConfig = createConfig({
  chains, // Menggunakan jaringan yang telah didefinisikan
  transports: {
    [base.id]: http(),
  },
  connectors, // Menggunakan konektor yang telah didefinisikan
});

// Inisialisasi Web3Modal setelah wagmiConfig selesai
createWeb3Modal({ wagmiConfig, projectId });

export { wagmiConfig };
