import React from 'react'

import LangSelect from '@/4_features/Lang/LangSelect'
import ThemeToggle from '@/4_features/ThemeToggle/ThemeToggle'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import Create from '@public/assets/icons/create.svg'
import FavoritesIcon from '@public/assets/icons/favorite.svg'
import Home from '@public/assets/icons/home-light.svg'
import LogOut from '@public/assets/icons/log-out-outline.svg'
import Messenger from '@public/assets/icons/message.svg'
import MobileDots from '@public/assets/icons/more-horizontal.svg'
import MyProfile from '@public/assets/icons/person.svg'
import Search from '@public/assets/icons/search.svg'
import ProfileSettings from '@public/assets/icons/settings.svg'
import Statistics from '@public/assets/icons/trending-up-outline.svg'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

import styles from '@/styles/HeaderMenu.module.scss'
export const HeaderMenu = () => {
  const { t } = useTranslation()

  return (
    <Menu>
      <span className={`svg ${styles.Menu}`}>
        <MenuButton
          _active={{ background: 'none' }}
          _hover={{ background: 'none' }}
          aria-label={'Options'}
          as={IconButton}
          background={'none'}
          className={styles.MenuButton}
          icon={<MobileDots />}
        />
      </span>
      <MenuList className={styles.MenuList}>
        <MenuItem className={styles.MenuItem} icon={<ProfileSettings />}>
          {t.navBar.settings}
        </MenuItem>
        <MenuItem
          className={styles.MenuItem}
          //Пофиксить
          // svg инлайново, потому что есть баг при адаптиве. Иконки снизу от navbar тоже пропадают, если использовать импорт через компоненту.
          icon={
            <svg
              fill={'none'}
              height={'24'}
              viewBox={'0 0 24 24'}
              width={'24'}
              xmlns={'http://www.w3.org/2000/svg'}
            >
              <g clipPath={'url(#clip0_301_4082)'}>
                <path
                  d={
                    'M20.42 10.18L12.71 2.3C12.617 2.20627 12.5064 2.13188 12.3846 2.08111C12.2627 2.03034 12.132 2.0042 12 2.0042C11.868 2.0042 11.7373 2.03034 11.6154 2.08111C11.4936 2.13188 11.383 2.20627 11.29 2.3L3.57999 10.19C3.39343 10.3781 3.24609 10.6013 3.14652 10.8468C3.04695 11.0923 2.99715 11.3551 2.99999 11.62V20C2.99922 20.5119 3.19477 21.0046 3.54637 21.3767C3.89797 21.7488 4.37885 21.9718 4.88999 22H19.11C19.6211 21.9718 20.102 21.7488 20.4536 21.3767C20.8052 21.0046 21.0008 20.5119 21 20V11.62C21.0008 11.0829 20.7928 10.5666 20.42 10.18ZM9.99999 20V14H14V20H9.99999ZM19 20H16V13C16 12.7348 15.8946 12.4804 15.7071 12.2929C15.5196 12.1054 15.2652 12 15 12H8.99999C8.73478 12 8.48042 12.1054 8.29289 12.2929C8.10535 12.4804 7.99999 12.7348 7.99999 13V20H4.99999V11.58L12 4.43L19 11.62V20Z'
                  }
                  fill={'black'}
                />
              </g>
              <defs>
                <clipPath id={'clip0_301_4082'}>
                  <rect fill={'white'} height={'24'} width={'24'} />
                </clipPath>
              </defs>
            </svg>
          }
        >
          {t.navBar.home}
        </MenuItem>
        <MenuItem
          className={styles.MenuItem}
          icon={
            <svg
              fill={'none'}
              height={'24'}
              viewBox={'0 0 24 24'}
              width={'24'}
              xmlns={'http://www.w3.org/2000/svg'}
            >
              <g clipPath={'url(#clip0_301_4459)'}>
                <path
                  d={
                    'M18 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3ZM19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H18C18.2652 5 18.5196 5.10536 18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6V18Z'
                  }
                  fill={'black'}
                />
                <path
                  d={
                    'M15 11H13V9C13 8.73478 12.8946 8.48043 12.7071 8.29289C12.5196 8.10536 12.2652 8 12 8C11.7348 8 11.4804 8.10536 11.2929 8.29289C11.1054 8.48043 11 8.73478 11 9V11H9C8.73478 11 8.48043 11.1054 8.29289 11.2929C8.10536 11.4804 8 11.7348 8 12C8 12.2652 8.10536 12.5196 8.29289 12.7071C8.48043 12.8946 8.73478 13 9 13H11V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11Z'
                  }
                  fill={'black'}
                />
              </g>
              <defs>
                <clipPath id={'clip0_301_4459'}>
                  <rect fill={'white'} height={'24'} width={'24'} />
                </clipPath>
              </defs>
            </svg>
          }
        >
          {t.navBar.create}
        </MenuItem>
        <MenuItem
          className={styles.MenuItem}
          icon={
            <svg
              fill={'none'}
              height={'24'}
              viewBox={'0 0 24 24'}
              width={'24'}
              xmlns={'http://www.w3.org/2000/svg'}
            >
              <g clipPath={'url(#clip0_306_4568)'}>
                <path
                  d={
                    'M12 11C12.7911 11 13.5645 10.7654 14.2223 10.3259C14.8801 9.88635 15.3928 9.26164 15.6955 8.53074C15.9983 7.79983 16.0775 6.99556 15.9231 6.21964C15.7688 5.44372 15.3878 4.73098 14.8284 4.17157C14.269 3.61216 13.5563 3.2312 12.7804 3.07686C12.0044 2.92252 11.2002 3.00173 10.4693 3.30448C9.73836 3.60723 9.11365 4.11992 8.67412 4.77772C8.2346 5.43552 8 6.20888 8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11Z'
                  }
                  fill={'black'}
                />
                <path
                  d={
                    'M18 21C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20C19 18.1435 18.2625 16.363 16.9497 15.0503C15.637 13.7375 13.8565 13 12 13C10.1435 13 8.36301 13.7375 7.05025 15.0503C5.7375 16.363 5 18.1435 5 20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18Z'
                  }
                  fill={'black'}
                />
              </g>
              <defs>
                <clipPath id={'clip0_306_4568'}>
                  <rect fill={'white'} height={'24'} width={'24'} />
                </clipPath>
              </defs>
            </svg>
          }
        >
          {t.navBar.myProfile}
        </MenuItem>
        <MenuItem
          className={styles.MenuItem}
          icon={
            <svg
              fill={'none'}
              height={'24'}
              viewBox={'0 0 24 24'}
              width={'24'}
              xmlns={'http://www.w3.org/2000/svg'}
            >
              <g clipPath={'url(#clip0_301_4222)'}>
                <path
                  d={
                    'M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
                  }
                  fill={'black'}
                />
                <path
                  d={
                    'M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z'
                  }
                  fill={'black'}
                />
                <path
                  d={
                    'M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z'
                  }
                  fill={'black'}
                />
                <path
                  d={
                    'M19.07 4.92999C17.4292 3.27849 15.2636 2.2512 12.9466 2.02523C10.6296 1.79926 8.30634 2.38877 6.37738 3.69212C4.44842 4.99548 3.03463 6.931 2.37976 9.165C1.72489 11.399 1.86997 13.7915 2.79 15.93C2.88589 16.1288 2.91735 16.3525 2.88 16.57L2 20.8C1.96609 20.9622 1.97302 21.1302 2.02014 21.2891C2.06727 21.4479 2.15313 21.5925 2.27 21.71C2.3658 21.8051 2.47987 21.8798 2.60533 21.9297C2.73079 21.9795 2.86504 22.0034 3 22H3.2L7.48 21.14C7.69753 21.1138 7.91812 21.1449 8.12 21.23C10.2585 22.15 12.651 22.2951 14.885 21.6402C17.119 20.9854 19.0545 19.5716 20.3579 17.6426C21.6612 15.7136 22.2507 13.3904 22.0248 11.0734C21.7988 8.75635 20.7715 6.59078 19.12 4.94999L19.07 4.92999ZM19.9 13.29C19.7045 14.484 19.2407 15.6181 18.5435 16.6069C17.8464 17.5957 16.934 18.4136 15.8751 18.9988C14.8162 19.5841 13.6384 19.9216 12.4302 19.9859C11.222 20.0502 10.015 19.8396 8.9 19.37C8.50454 19.2018 8.07973 19.1134 7.65 19.11C7.46228 19.1113 7.27498 19.128 7.09 19.16L4.27 19.73L4.84 16.91C4.95352 16.2993 4.88034 15.6685 4.63 15.1C4.16039 13.985 3.9498 12.7779 4.01409 11.5698C4.07837 10.3616 4.41586 9.18374 5.00114 8.12484C5.58642 7.06595 6.40425 6.15359 7.39309 5.45644C8.38193 4.75929 9.51602 4.29551 10.71 4.09999C11.9633 3.89431 13.2475 3.98997 14.4565 4.37905C15.6654 4.76814 16.7644 5.43948 17.6625 6.33753C18.5605 7.23558 19.2318 8.33454 19.6209 9.54351C20.01 10.7525 20.1057 12.0367 19.9 13.29Z'
                  }
                  fill={'black'}
                />
              </g>
              <defs>
                <clipPath id={'clip0_301_4222'}>
                  <rect fill={'white'} height={'24'} width={'24'} />
                </clipPath>
              </defs>
            </svg>
          }
        >
          {t.navBar.messenger}
        </MenuItem>

        <MenuItem
          className={styles.MenuItem}
          icon={
            <svg
              fill={'none'}
              height={'24'}
              viewBox={'0 0 24 24'}
              width={'24'}
              xmlns={'http://www.w3.org/2000/svg'}
            >
              <g clipPath={'url(#clip0_306_4723)'}>
                <path
                  d={
                    'M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z'
                  }
                  fill={'black'}
                />
              </g>
              <defs>
                <clipPath id={'clip0_306_4723'}>
                  <rect fill={'white'} height={'24'} width={'24'} />
                </clipPath>
              </defs>
            </svg>
          }
        >
          {t.navBar.search}
        </MenuItem>
        <MenuItem
          className={styles.MenuItem}
          icon={
            <svg
              fill={'none'}
              height={'24'}
              viewBox={'0 0 24 24'}
              width={'24'}
              xmlns={'http://www.w3.org/2000/svg'}
            >
              <g clipPath={'url(#clip0_301_4749)'}>
                <path
                  d={
                    'M21 7C21.0095 6.93032 21.0095 6.85968 21 6.79C20.9913 6.73129 20.9745 6.67407 20.95 6.62C20.9236 6.57113 20.8935 6.52433 20.86 6.48C20.8219 6.41675 20.7748 6.35947 20.72 6.31L20.6 6.24C20.5423 6.19696 20.4782 6.16321 20.41 6.14H20.21C20.149 6.08099 20.0779 6.03356 20 6H15C14.7348 6 14.4804 6.10536 14.2929 6.29289C14.1053 6.48043 14 6.73478 14 7C14 7.26522 14.1053 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H17.83L13.83 12.71L9.50999 10.14C9.30537 10.0183 9.06405 9.97359 8.82941 10.0139C8.59478 10.0542 8.38223 10.177 8.22999 10.36L3.22999 16.36C3.14579 16.461 3.08235 16.5777 3.0433 16.7033C3.00426 16.8289 2.99038 16.961 3.00245 17.092C3.01453 17.2229 3.05233 17.3503 3.11368 17.4666C3.17503 17.5829 3.25873 17.6861 3.35999 17.77C3.5399 17.9191 3.76634 18.0005 3.99999 18C4.1469 18.0002 4.29206 17.9681 4.42514 17.9059C4.55823 17.8437 4.67597 17.7529 4.76999 17.64L9.21999 12.3L13.49 14.86C13.6925 14.9801 13.9309 15.0249 14.1633 14.9865C14.3956 14.9481 14.6069 14.8289 14.76 14.65L19 9.7V12C19 12.2652 19.1053 12.5196 19.2929 12.7071C19.4804 12.8946 19.7348 13 20 13C20.2652 13 20.5196 12.8946 20.7071 12.7071C20.8946 12.5196 21 12.2652 21 12V7Z'
                  }
                  fill={'black'}
                />
              </g>
              <defs>
                <clipPath id={'clip0_301_4749'}>
                  <rect fill={'white'} height={'24'} width={'24'} />
                </clipPath>
              </defs>
            </svg>
          }
        >
          {t.navBar.statistics}
        </MenuItem>
        <MenuItem className={styles.MenuItem} icon={<FavoritesIcon />}>
          {t.navBar.favorites}
        </MenuItem>
        <Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
          <MenuItem className={styles.MenuItem} icon={<LogOut />}>
            {t.signIn_SignUp.logout}
          </MenuItem>
        </Link>

        <div className={styles.additionalFeatures}>
          <div className={styles.additionalFeatures_item}>
            <LangSelect />
          </div>
          <div className={styles.additionalFeatures_item}>
            <ThemeToggle />
          </div>
        </div>
      </MenuList>
    </Menu>
  )
}
