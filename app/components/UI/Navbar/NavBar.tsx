import { NavLink, Link, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useMatches } from "@remix-run/react";
import ScrollLink from "../ScrollLink/ScrollLink";
import type { User } from "@prisma/client";

const NavBar = ({ user }: { user?: User }) => {
  const matches = useMatches();
  const currentRoute = matches[2]?.id;
  const [showNavBar, setShowNavBar] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname) {
      setShowNavBar(false);
    }
  }, [location.pathname]);

  return (
    <header
      className={` bg-[rgba(0,0,0,0.1)]  sticky top-0 flex justify-between w-full text-slate-100  items-center  py-[18px] md:py-[36px] px-4 md:px-12 z-[5000]  `}
    >
      <Link className="hover:scale-110 transition-all" to="/">
        {/* <img
          className="h-[40px] w-auto object-contain"
          src="/images/logo.svg"
          alt="logo"
        /> */}
        <div className=" h-[20px] xl:h-[40px] ">
          <svg
            className="h-full"
            viewBox="0 0 410 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="hidden xl:inline"
              d="M63.4956 47.9329C64.2788 49.5917 65.0619 51.2504 65.7471 53.0067C67.2155 56.4217 68.3902 59.9342 68.9775 63.6419C69.3691 65.8861 69.467 68.1302 68.7817 70.3744C68.0965 72.7161 66.3345 73.9845 63.8872 73.9845C61.6357 73.9845 59.6779 73.2039 57.7201 72.2282C56.0559 71.3501 54.3918 70.2768 52.7276 69.2035C52.0424 68.7157 51.4551 68.6181 50.574 68.9108C47.931 69.8865 44.9943 67.2521 45.3858 64.5201C45.5816 63.3492 45.4837 63.1541 44.4069 62.3735C44.309 62.5687 44.1133 62.7638 44.0154 62.9589C41.666 66.3739 39.1208 69.6914 36.1841 72.6185C34.3242 74.3748 32.3664 76.1311 30.017 77.2044C28.8423 77.6922 27.6676 78.0825 26.395 77.9849C24.4372 77.8874 23.1646 76.7165 22.3815 75.1554C21.5005 73.4967 21.2068 71.6428 21.011 69.7889C20.6195 64.6177 21.4026 59.6415 22.5773 54.6654C22.6752 54.2751 22.7731 53.8848 22.8709 53.3969C22.6752 53.3969 22.4794 53.2994 22.2836 53.2994C17.6827 53.1042 13.0819 52.5188 8.57889 51.2504C6.52318 50.6649 4.56537 49.8844 2.80333 48.6159C2.31388 48.2257 1.82442 47.8354 1.43286 47.4451C-0.231284 45.5912 -0.427066 43.5422 0.747623 41.3957C1.82442 39.5418 3.39068 38.1758 5.15271 37.0049C6.81685 35.9317 8.57889 34.9559 10.3409 33.9802C10.7325 33.7851 10.8304 33.5899 10.9283 33.1021C11.0262 31.4434 11.8093 30.2725 13.3755 29.5895C14.9418 28.9065 16.4102 29.1017 17.6827 30.1749C18.1722 30.5652 18.5638 30.6628 19.1511 30.4677C19.4448 30.2725 19.8363 30.1749 20.2279 30.1749C20.6195 30.0774 20.7174 29.8822 20.5216 29.4919C18.9553 26.3697 17.5848 23.1498 16.508 19.7348C15.627 17.0028 14.9418 14.1732 14.8439 11.2461C14.8439 9.97767 14.9418 8.70924 15.3334 7.53838C16.1165 4.90395 18.368 3.53795 21.2068 3.92824C24.1435 4.31852 26.6887 5.68452 29.2339 7.14809C32.8558 9.39224 35.9883 12.1242 39.1208 14.9538C39.3166 15.1489 39.5124 15.3441 39.7082 15.5392C40.5892 14.3684 41.3723 13.1975 42.2533 12.0267C44.5048 9.00195 46.9521 6.17238 49.7909 3.73309C51.4551 2.3671 53.1192 1.09867 55.1749 0.415667C56.0559 0.122952 56.9369 -0.0721902 57.818 0.0253812C60.3631 0.122953 61.6357 1.87924 62.4188 4.02581C63.1041 5.97724 63.2999 7.92867 63.2999 9.97767C63.2999 11.5388 63.202 13.1 63.1041 14.5635C63.1041 14.7587 63.2999 15.0514 63.4956 15.1489C64.4745 15.7344 65.0619 16.6125 65.3556 17.6858C65.9429 19.8324 64.5724 22.0765 62.4188 22.6619C61.9294 22.7595 61.6357 22.9547 61.6357 23.4425C61.6357 23.6377 61.5378 23.8328 61.4399 24.0279C61.2441 24.6134 61.342 24.6134 61.9294 24.6134C65.845 24.8085 69.6628 25.1988 73.4805 26.0769C76.1235 26.6624 78.6687 27.5405 81.0181 29.0041C82.2907 29.7847 83.3675 30.7604 83.9548 32.1264C84.5422 33.5899 84.4443 34.9559 83.6611 36.3219C82.6822 38.0782 81.3118 39.4442 79.7455 40.6151C76.613 42.9568 73.0889 44.6155 69.3691 45.9815C67.4113 46.5669 65.4534 47.2499 63.4956 47.9329ZM16.6059 9.58738C16.7038 11.2461 16.9975 12.8072 17.487 14.3684C18.8574 19.2469 21.011 23.8328 23.3604 28.4187C23.5562 28.8089 23.8499 28.8089 24.2414 28.7114C26.9824 28.0284 29.8212 27.4429 32.5621 26.7599C32.8558 26.6624 33.1495 26.4672 33.2474 26.1745C34.7157 23.5401 36.1841 20.9057 37.7504 18.2712C37.9461 17.8809 37.9461 17.6858 37.6525 17.3931C35.6946 15.5392 33.8347 13.6854 31.8769 11.9291C29.5275 9.88009 27.1781 8.02624 24.3393 6.56267C22.9688 5.87967 21.6963 5.29424 20.13 5.19667C18.6616 5.09909 17.5848 5.7821 17.0954 7.05052C16.8017 7.92867 16.7038 8.70924 16.6059 9.58738ZM62.1252 27.3454C61.8315 27.3454 61.342 27.3454 60.9505 27.3454C60.5589 27.3454 60.461 27.5405 60.2652 27.8332C59.2863 30.7604 58.4053 33.6875 57.4264 36.6147C57.3285 37.0049 57.3285 37.2977 57.5243 37.6879C58.8948 40.0297 60.3631 42.3714 61.7336 44.7131C62.0273 45.2009 62.223 45.2985 62.7125 45.1034C65.6492 44.1277 68.586 43.2495 71.5227 42.1762C74.4594 41.1029 77.2982 39.7369 79.8434 37.8831C80.8223 37.2001 81.6054 36.4195 82.2907 35.4438C83.0738 34.0778 82.9759 32.8094 81.8991 31.7361C81.7033 31.5409 81.4097 31.3458 81.2139 31.1507C79.9413 30.2725 78.4729 29.6871 77.0046 29.2968C72.0121 27.8332 67.1176 27.5405 62.1252 27.3454ZM23.1646 69.4962C23.1646 70.0817 23.2625 71.0574 23.3604 72.1307C23.5562 73.2039 23.8499 74.2772 24.5351 75.1554C25.2203 76.0335 26.1013 76.3262 27.0803 76.2287C28.3528 76.1311 29.4296 75.4481 30.4085 74.7651C32.4642 73.3015 34.2263 71.3501 35.7925 69.4962C38.1419 66.6667 40.1976 63.6419 42.2533 60.5197C42.4491 60.2269 42.4491 60.0318 42.2533 59.8367C40.2955 57.5925 38.2398 55.3484 36.282 53.2018C36.0862 53.0067 35.7925 52.9091 35.5968 52.9091C32.5621 53.0067 29.6254 53.1042 26.5908 53.2018C26.1013 53.2018 25.8077 53.2994 25.7098 53.7872C25.3182 55.3484 24.9267 56.9095 24.5351 58.4707C23.752 61.9832 23.2625 65.4958 23.1646 69.4962ZM67.5092 68.2278C67.4113 66.2764 67.1176 64.6177 66.6281 62.9589C65.2577 58.0804 63.1041 53.4945 60.7547 49.1038C60.5589 48.8111 60.3631 48.8111 60.0695 48.8111C57.2306 49.4941 54.3918 50.0795 51.553 50.7625C51.3572 50.8601 51.0635 50.9577 50.9656 51.1528C49.3994 53.8848 47.931 56.6168 46.3647 59.2512C46.169 59.5439 46.2668 59.7391 46.4626 59.9342C46.7563 60.2269 47.05 60.5197 47.3436 60.8124C47.5394 61.1051 47.8331 61.1051 48.1268 61.0075C48.6162 60.8124 49.1057 60.7148 49.5951 60.6172C51.7487 60.4221 54.4897 62.7638 53.6087 65.6909C53.4129 66.2764 53.6087 66.6667 54.0002 66.9594C55.2728 67.8375 56.4475 68.7157 57.6222 69.5938C59.2863 70.7647 61.1463 71.6428 63.1041 72.1307C65.2577 72.6185 66.8239 71.6428 67.2155 69.4962C67.5092 69.0084 67.5092 68.5205 67.5092 68.2278ZM21.7941 50.1771C22.2836 50.1771 22.8709 50.1771 23.3604 50.1771C23.6541 50.1771 23.8499 50.0795 23.8499 49.7868C24.8288 46.7621 25.8077 43.7374 26.7866 40.7127C26.8845 40.5175 26.7866 40.2248 26.6887 40.0297C25.2203 37.4928 23.752 35.0535 22.2836 32.5167C22.0878 32.2239 21.9899 32.2239 21.6963 32.2239C21.1089 32.4191 20.5216 32.5167 19.9342 32.7118C19.4448 32.8094 19.0532 33.1021 19.0532 33.6875C18.9553 34.6632 18.4659 35.4438 17.7806 36.0292C16.1165 37.3952 13.9629 37.3952 12.2987 35.9317C12.103 35.7365 11.9072 35.5414 11.5156 35.7365C9.06834 36.8098 6.71896 37.8831 4.56537 39.4442C3.48857 40.2248 2.60755 41.0054 1.92231 42.1762C1.13919 43.5422 1.33497 44.8107 2.41177 45.8839C2.90122 46.3718 3.48857 46.7621 3.97802 47.0548C5.54427 47.9329 7.30631 48.4208 9.16623 48.8111C13.3755 49.7868 17.5848 49.9819 21.7941 50.1771ZM55.2728 24.3207C55.2728 24.4182 55.2728 24.4182 55.2728 24.3207C56.1538 24.4182 56.9369 24.3207 57.7201 24.4182C58.0137 24.4182 58.2095 24.3207 58.2095 24.0279C58.3074 23.4425 58.5032 22.9547 58.699 22.3692C58.7969 21.9789 58.699 21.7838 58.4053 21.4911C55.958 19.5397 56.7412 15.4417 59.8737 14.5635C60.2652 14.4659 60.3631 14.2708 60.461 13.8805C60.7547 11.2461 61.0484 8.61167 60.7547 5.97724C60.6568 4.70881 60.3631 3.53795 59.6779 2.46467C58.9927 1.48895 58.0137 1.0011 56.8391 1.19624C55.8601 1.39138 54.9791 1.78167 54.196 2.36709C52.5319 3.44038 51.1614 4.80638 49.8888 6.17238C46.7563 9.48981 44.2111 13.1975 41.7639 17.0028C41.5681 17.2955 41.666 17.4907 41.8618 17.7834C43.7217 19.8324 45.4837 21.7838 47.2458 23.8328C47.7352 24.4182 48.2247 24.7109 49.0078 24.6134C51.1614 24.5158 53.2171 24.4182 55.2728 24.3207ZM37.6525 49.5917C38.925 49.3965 40.1976 49.2989 41.3723 49.2014C43.8196 48.9087 46.2669 48.5184 48.7141 48.2257C49.1057 48.2257 49.3015 48.0305 49.3994 47.7378C50.8677 44.5179 52.2382 41.2981 53.7066 37.9807C53.8044 37.7855 53.7066 37.3952 53.6087 37.2001C53.1192 36.4195 52.6298 35.6389 52.0424 34.9559C50.574 33.0045 49.1057 30.9555 47.7352 29.0041C47.2458 28.2235 46.5605 27.9308 45.5816 28.0284C43.9175 28.2235 42.1554 28.4187 40.4913 28.6138C38.925 28.8089 37.4567 29.1017 35.8904 29.2968C35.4989 29.3944 35.2052 29.3944 35.0094 29.7847C33.541 33.0045 32.0727 36.3219 30.7022 39.5418C30.6043 39.7369 30.6043 40.1272 30.8001 40.2248C32.9537 43.2495 35.2052 46.1767 37.3588 49.2014C37.2609 49.4941 37.5546 49.5917 37.6525 49.5917ZM29.0381 43.5422C28.2549 45.7864 27.5697 47.9329 26.7866 50.2747C29.136 50.1771 31.3874 50.0795 33.7368 49.9819C32.0727 47.7378 30.6043 45.6888 29.0381 43.5422ZM55.1749 33.9802C55.958 31.7361 56.6433 29.5895 57.4264 27.3454C55.077 27.4429 52.8255 27.5405 50.4762 27.6381C52.0424 29.7847 53.6087 31.8337 55.1749 33.9802ZM44.1133 57.4949C45.1901 55.4459 46.2668 53.4945 47.4415 51.5431C44.7985 51.9334 42.3512 52.2261 39.8061 52.5188C41.1765 54.1775 42.6449 55.8362 44.1133 57.4949ZM40.0018 20.0275C38.925 22.0765 37.8482 24.0279 36.6735 25.9794C39.3166 25.6867 41.7639 25.2964 44.309 25.0037C42.9386 23.3449 41.5681 21.6862 40.0018 20.0275ZM31.1917 30.1749C31.0938 30.1749 30.9959 30.1749 30.898 30.1749C29.136 30.5652 27.3739 30.9555 25.6119 31.3458C25.2203 31.4434 25.1224 31.5409 25.3182 31.9312C26.1992 33.3948 27.1781 34.9559 28.0592 36.4195C28.1571 36.5171 28.2549 36.6147 28.3528 36.7122C29.3317 34.5657 30.2128 32.4191 31.1917 30.1749ZM55.8601 40.7127C54.8812 42.9568 53.9023 45.2009 52.9234 47.4451C54.9791 46.9572 57.0348 46.5669 59.0905 46.0791C58.0137 44.2252 56.9369 42.4689 55.8601 40.7127Z"
              fill="#F8FAFA"
            />
            <path
              className="hidden xl:inline"
              d="M35.3031 38.7612C35.3031 35.0535 38.3377 32.0288 42.0575 32.0288C45.8753 32.0288 48.9099 35.0535 48.9099 38.8588C48.9099 42.6641 45.9732 45.5912 42.1554 45.5912C37.9461 45.5912 35.3031 42.3714 35.3031 38.7612Z"
              fill="#F8FAFA"
            />
            <path
              className=" -translate-x-[50px] xl:translate-x-0"
              d="M107.718 23.9722C114.167 23.9722 118.632 26.3622 121.113 31.1422L116.648 33.7795C114.774 30.2082 111.797 28.4226 107.718 28.4226C105.513 28.4226 103.597 29.0132 101.971 30.1945C100.345 31.3758 99.5321 32.818 99.5321 34.5212C99.5321 36.2245 100.221 37.5843 101.599 38.6008C102.977 39.6172 105.375 40.4276 108.793 41.032C113.864 41.9111 117.364 43.216 119.294 44.9467C121.223 46.6774 122.188 49.1086 122.188 52.2404C122.188 55.8117 120.906 58.6687 118.343 60.8115C115.78 62.9543 112.431 64.0257 108.297 64.0257C101.02 63.9707 95.9215 61.3884 93 56.2787L97.3823 53.3118C98.3194 55.2348 99.849 56.7595 101.971 57.8858C104.093 59.0121 106.257 59.5753 108.462 59.5753C110.998 59.5753 113.092 58.8748 114.746 57.4737C116.4 56.0727 117.227 54.4381 117.227 52.57C117.227 50.8668 116.551 49.4658 115.201 48.3669C113.85 47.268 110.915 46.2791 106.395 45.4C102.481 44.6308 99.5321 43.4495 97.5476 41.8561C95.5632 40.2628 94.571 37.9552 94.571 34.9333C94.571 31.6917 95.8113 29.0544 98.2918 27.0215C100.772 24.9886 103.914 23.9722 107.718 23.9722ZM126.146 14H131.107V24.9611H142.022V29.4115H131.107V54.3008C131.107 55.8941 131.576 57.1715 132.513 58.133C133.45 59.0945 134.745 59.5753 136.399 59.5753C138.218 59.5753 140.092 59.1358 142.022 58.2567L142.435 62.7071C139.954 63.5861 137.777 64.0257 135.903 64.0257C132.651 64.0257 130.211 63.1191 128.585 61.306C126.959 59.4929 126.146 57.1578 126.146 54.3008V29.4115H117.878V24.9611H126.146V14ZM171.612 40.7848C171.612 37.3233 170.317 34.3976 167.726 32.0076C165.135 29.6176 161.993 28.4226 158.3 28.4226C154.717 28.4226 151.63 29.6176 149.039 32.0076C146.449 34.3976 144.933 37.3233 144.492 40.7848H171.612ZM158.631 23.9722C163.923 23.9722 168.222 25.6754 171.53 29.0819C174.837 32.4884 176.518 36.8838 176.573 42.2682V45.2352H144.492C144.712 49.5207 146.132 52.9684 148.75 55.5782C151.368 58.188 154.772 59.5204 158.962 59.5753C161.552 59.5753 164.019 58.9572 166.362 57.721C168.704 56.4847 170.51 54.8502 171.778 52.8173L175.416 55.8666C171.833 61.306 166.32 64.0257 158.879 64.0257C153.036 63.9707 148.364 62.0752 144.864 58.3391C141.364 54.6029 139.586 49.7954 139.531 43.9165C139.531 38.2024 141.336 33.4636 144.946 29.7C148.557 25.9364 153.118 24.0271 158.631 23.9722ZM178.713 24.9611L191.446 57.6798L203.849 24.9611H208.893L193.844 63.0367H188.718L173.09 24.9611H178.713ZM237.491 40.7848C237.491 37.3233 236.196 34.3976 233.605 32.0076C231.014 29.6176 227.872 28.4226 224.179 28.4226C220.596 28.4226 217.509 29.6176 214.918 32.0076C212.327 34.3976 210.812 37.3233 210.371 40.7848H237.491ZM224.51 23.9722C229.801 23.9722 234.101 25.6754 237.408 29.0819C240.716 32.4884 242.397 36.8838 242.452 42.2682V45.2352H210.371C210.591 49.5207 212.01 52.9684 214.629 55.5782C217.247 58.188 220.651 59.5204 224.84 59.5753C227.431 59.5753 229.898 58.9572 232.241 57.721C234.583 56.4847 236.389 54.8502 237.656 52.8173L241.295 55.8666C237.712 61.306 232.199 64.0257 224.758 64.0257C218.915 63.9707 214.243 62.0752 210.743 58.3391C207.242 54.6029 205.465 49.7954 205.409 43.9165C205.409 38.2024 207.215 33.4636 210.825 29.7C214.436 25.9364 218.997 24.0271 224.51 23.9722ZM262.534 23.9722C267.495 23.9722 271.147 25.3045 273.49 27.9693C275.833 30.634 277.031 34.8234 277.087 40.5375V63.0367H272.126V40.7848C272.126 36.5541 271.34 33.4361 269.769 31.4307C268.198 29.4253 265.786 28.4226 262.534 28.4226C258.51 28.4226 255.313 29.8099 252.943 32.5845C250.572 35.3591 249.36 39.2189 249.305 44.1638V63.0367H244.344V35.263C244.288 33.6696 244.151 30.2357 243.93 24.9611H248.891C249.001 29.3017 249.112 31.5268 249.222 31.6367H249.47C250.572 29.3291 252.323 27.4748 254.72 26.0737C257.118 24.6727 259.723 23.9722 262.534 23.9722ZM296.249 14H301.21V24.9611H312.124V29.4115H301.21V54.3008C301.21 55.8941 301.678 57.1715 302.615 58.133C303.552 59.0945 304.848 59.5753 306.502 59.5753C308.321 59.5753 310.195 59.1358 312.124 58.2567L312.538 62.7071C310.057 63.5861 307.88 64.0257 306.005 64.0257C302.753 64.0257 300.314 63.1191 298.688 61.306C297.062 59.4929 296.249 57.1578 296.249 54.3008V29.4115H287.98V24.9611H296.249V14ZM328.816 23.9722C329.753 23.9722 330.718 24.1095 331.71 24.3842L331.131 29.2467C330.525 29.0269 329.863 28.9171 329.147 28.9171C325.123 28.9171 322.05 30.1533 319.927 32.6257C317.805 35.0981 316.744 38.3123 316.744 42.2682V63.0367H311.783V35.263C311.783 34.7135 311.645 31.2796 311.37 24.9611H316.331C316.441 28.7522 316.551 30.9774 316.661 31.6367C319.528 26.527 323.579 23.9722 328.816 23.9722ZM333.353 52.4876C333.353 54.5755 334.194 56.2787 335.875 57.5973C337.556 58.916 339.637 59.5753 342.118 59.5753C346.583 59.5753 349.904 58.4078 352.081 56.0727C354.259 53.7376 355.347 50.5646 355.347 46.5538V43.9165H349.394C344.323 43.9165 340.382 44.6857 337.57 46.2241C334.759 47.7625 333.353 49.8504 333.353 52.4876ZM344.598 23.9722C349.725 23.9722 353.528 25.1534 356.009 27.516C358.489 29.8786 359.757 33.1751 359.812 37.4058V48.6966C359.812 54.8502 360.06 59.6302 360.557 63.0367H355.926C355.595 61.3335 355.43 59.2731 355.43 56.8556H355.265C352.509 61.6357 348.071 64.0257 341.953 64.0257C337.818 64.0257 334.538 63.0092 332.113 60.9763C329.688 58.9435 328.447 56.1963 328.392 52.7349C328.392 48.5043 330.225 45.3176 333.891 43.1748C337.556 41.032 342.669 39.9606 349.229 39.9606H355.347V37.7354C355.347 34.6037 354.383 32.2686 352.453 30.7302C350.524 29.1918 347.906 28.4226 344.598 28.4226C340.189 28.4226 336.302 29.8511 332.94 32.7081L330.046 29.3291C331.865 27.5709 334.111 26.2386 336.785 25.332C339.458 24.4255 342.063 23.9722 344.598 23.9722ZM382.044 23.9722C387.005 23.9722 390.657 25.3045 393 27.9693C395.343 30.634 396.541 34.8234 396.597 40.5375V63.0367H391.636V40.7848C391.636 36.5541 390.85 33.4361 389.279 31.4307C387.708 29.4253 385.296 28.4226 382.044 28.4226C378.02 28.4226 374.823 29.8099 372.453 32.5845C370.082 35.3591 368.87 39.2189 368.815 44.1638V63.0367H363.854V35.263C363.798 33.6696 363.661 30.2357 363.44 24.9611H368.401C368.511 29.3017 368.622 31.5268 368.732 31.6367H368.98C370.082 29.3291 371.833 27.4748 374.23 26.0737C376.628 24.6727 379.233 23.9722 382.044 23.9722Z"
              fill="#F1F2F2"
            />
          </svg>
        </div>
      </Link>
      <Button
        className="lg:hidden hover:scale-110 transition-all hover:!bg-transparent"
        onClick={() => {
          setShowNavBar(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 448 512"
          fill="#ffff"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </Button>

      <div
        onClick={() => {
          setShowNavBar(false);
        }}
        className={`${
          showNavBar ? "block" : "hidden"
        } lg:hidden fixed top-0 left-0 bg-modal w-screen h-screen`}
      />
      <AnimatePresence initial={false}>
        <motion.nav
          initial={{ transform: "translateX(100%)", opacity: 0 }}
          animate={{ transform: "translateX(0)", opacity: 1 }}
          exit={{ transform: "translateX(100%)", opacity: 0 }}
          key={"navbar" + String(showNavBar)}
          className={`${
            !showNavBar ? "hidden" : "flex"
          }  drop-shadow-lg lg:drop-shadow-none items-center justify-center 
          w-full md:w-1/2 flex-col lg:px-0 bg-indigo-700 lg:bg-transparent  fixed right-0 top-0  lg:w-auto h-full lg:h-auto lg:static  lg:block`}
        >
          <span
            onClick={() => {
              setShowNavBar(false);
            }}
            className=" text-white lg:hidden  absolute top-[5%] right-[5%] cursor-pointer hover:scale-110 transition-all"
          >
            X
          </span>
          <ul
            className={`flex lg:text-slate-100  flex-col lg:flex-row gap-[60px] md:gap-[80px] text-xl lg:text-[16px] items-center ${
              currentRoute === "routes/__app/my-project/$projectId/index"
                ? "!text-white"
                : ""
            }`}
          >
            <li
              onClick={() => {
                setShowNavBar(false);
              }}
              className="hover:scale-110 transition-all"
            >
              <ScrollLink to="about">About me</ScrollLink>
            </li>
            <li
              onClick={() => {
                setShowNavBar(false);
              }}
              className="hover:scale-110 transition-all"
            >
              <ScrollLink to="my-project">My Projects</ScrollLink>
            </li>

            <li
              onClick={() => {
                setShowNavBar(false);
              }}
              className="hover:scale-110 transition-all"
            >
              <ScrollLink to="my-skills">My Skills</ScrollLink>
            </li>
            <li
              onClick={() => {
                setShowNavBar(false);
              }}
              className="hover:scale-110 transition-all"
            >
              <ScrollLink to="my-contact">My Contacts</ScrollLink>
            </li>
            {!user ? (
              <li className="hover:scale-110 transition-all ">
                <NavLink className="opacity-50 " to="/auth">
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li className="hover:scale-110 transition-all ">
                  <NavLink className="opacity-50" to="/profile/">
                    {user.name}
                  </NavLink>
                </li>
                <li className="hover:scale-110 transition-all">
                  <Link className="opacity-50" to="/logout">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </motion.nav>
      </AnimatePresence>
    </header>
  );
};
export default NavBar;
