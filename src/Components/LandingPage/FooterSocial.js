import React from "react";
import Facebook from "../../svges/Facebook";
import InstagramSvg from "../../svges/InstagramSvg";
import TiktokSvg from "../../svges/TiktokSvg";
import TelegramSvg from "../../svges/TelegramSvg";
import YoutubeSvg from "../../svges/YoutubeSvg";
function FooterSocial() {
  return (
    <div className="mm-socials">
      <a
        href="https://www.facebook.com/myprofile.ge"
        target="_blank"
        data-svg="facebookSvg"
      >
        <Facebook />
      </a>
      <a
        href="https://www.instagram.com/mm_myprofile/"
        target="_blank"
        data-svg="instagramSvg"
      >
        <InstagramSvg />
      </a>
      <a
        href="https://www.tiktok.com/@MM_MyProfile"
        target="_blank"
        data-svg="tiktokSvg"
      >
        <TiktokSvg />
      </a>
      <a
        href="https://t.me/MM_MyProfile"
        target="_blank"
        data-svg="telegramSvg"
      >
        <TelegramSvg />
      </a>
      <a
        href="https://www.youtube.com/@MyProfilege"
        target="_blank"
        data-svg="youtubeSvg"
      >
        <YoutubeSvg />
      </a>
    </div>
  );
}

export default FooterSocial;
