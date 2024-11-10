import '@walletconnect/react-native-compat';
import React from 'react';
import { WagmiProvider } from 'wagmi';

import {
  AppKit,
  createAppKit,
  defaultWagmiConfig,
  useAppKit,
  useWalletInfo,
} from '@reown/appkit-wagmi-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains';

import { Stack } from 'expo-router';

const queryClient = new QueryClient();

// 1. Get projectId at <https://cloud.walletconnect.com>
const projectId = 'bfc19fc7695030111c1fa8f050c3e3a9';

// 2. Create config
const metadata = {
  name: 'Nexus Pay',
  description: 'Nexus Wallet is a decentralized wallet for the Nexus Protocol.',
  url: 'https://binayachaudari.com.np',
  icons: ['<https://avatars.githubusercontent.com/u/37784886>'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'https://binayachaudari.com.np',
  },
};

const chains = [mainnet, polygon, arbitrum] as const;

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  autoConnect: true,
});

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function RootLayout() {
  const { open } = useAppKit();
  const { walletInfo } = useWalletInfo();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(home)/index" options={{ title: 'Nexus Pay' }} />
        </Stack>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
