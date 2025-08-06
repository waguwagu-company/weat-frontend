import localFont from 'next/font/local';

export const cafe24proup = localFont({
  src: '../assets/fonts/cafe24proup/Cafe24PROUP.woff2',
  display: 'swap',
  variable: '--font-cafe24-pro-up',
});

export const paperlogy = localFont({
  src: [
    {
      path: '../assets/fonts/paperlogy/Paperlogy-6SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/paperlogy/Paperlogy-7Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-paperlogy',
});

export const pretendard = localFont({
  src: '../assets/fonts/pretendard/PretendardVariable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-pretendard',
});
