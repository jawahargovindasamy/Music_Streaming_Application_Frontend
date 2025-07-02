import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const ShareSection = ({ name, artistName, albumName, artistGenre, music }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const title =
    name === "album"
      ? `Check out Album ${albumName} on our Music App!`
      : `Check out ${artistName}'s profile on our Music App!`;

  // ✅ Sentence dynamically formed based on available data
  const description = `Discover ${artistName}'s ${music || "music"}${
    albumName ? ` from the album "${albumName}"` : ""
  }${
    artistGenre ? ` in the ${artistGenre} genre` : ""
  }, along with albums and latest tracks. Listen now!`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed: ", err);
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-10 bg-slate-800/40 rounded-xl p-6 text-center border border-slate-700/50 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-2">
        {`Share this ${name}`}
      </h3>
      <p className="text-slate-300 text-sm mb-6">
        Spread the word about {artistName}'s amazing {music || "music"}!
      </p>

      {/* Sharing buttons */}
      <div className="flex justify-center gap-3 mb-4 flex-wrap">
        <FacebookShareButton
          url={shareUrl}
          quote={title}
          hashtag="#music"
          aria-label={`Share ${artistName} on Facebook`}
          className="hover:scale-110 transition-transform duration-200"
        >
          <FacebookIcon size={44} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={title}
          hashtags={[
            "music",
            "artist",
            artistGenre?.toLowerCase().replace(/\s+/g, ""),
          ].filter(Boolean)}
          aria-label={`Share ${artistName} on Twitter`}
          className="hover:scale-110 transition-transform duration-200"
        >
          <TwitterIcon size={44} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={`${title}\n\n${description}`}
          separator=" - "
          aria-label={`Share ${artistName} on WhatsApp`}
          className="hover:scale-110 transition-transform duration-200"
        >
          <WhatsappIcon size={44} round />
        </WhatsappShareButton>

        <LinkedinShareButton
          url={shareUrl}
          title={title}
          summary={description}
          source="Music App"
          aria-label={`Share ${artistName} on LinkedIn`}
          className="hover:scale-110 transition-transform duration-200"
        >
          <LinkedinIcon size={44} round />
        </LinkedinShareButton>

        <TelegramShareButton
          url={shareUrl}
          title={title}
          aria-label={`Share ${artistName} on Telegram`}
          className="hover:scale-110 transition-transform duration-200"
        >
          <TelegramIcon size={44} round />
        </TelegramShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={title}
          body={`${description}\n\nCheck it out: ${shareUrl}`}
          aria-label={`Share ${artistName} via Email`}
          className="hover:scale-110 transition-transform duration-200"
        >
          <EmailIcon size={44} round />
        </EmailShareButton>
      </div>

      {/* Copy link */}
      <div className="pt-4 border-t border-slate-700/50">
        <p className="text-slate-400 text-xs mb-3">
          Or copy the link directly:
        </p>
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-slate-700/50 text-slate-200 text-sm px-3 py-2 rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            onClick={(e) => {
              e.target.select();
              e.target.setSelectionRange(0, 99999);
            }}
          />
          <button
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${
              copied
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            aria-label="Copy link to clipboard"
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-4 text-xs text-slate-500">
        Share with your friends and help {artistName} reach more listeners!
      </div>
    </div>
  );
};

ShareSection.propTypes = {
  name: String,
  artistName: String,
  albumName: String,
  artistGenre: String,
  music: String,
};

ShareSection.defaultProps = {
  albumName: "",
  artistGenre: "",
  music: "music",
};

export default ShareSection;
