import styles from "./GameBanner.module.css";

interface GameBannerProps {
  bannerUrl: string | null;
  title: string;
  modality: string;
}

export function GameBanner({ bannerUrl, title, modality }: GameBannerProps) {
  return (
    <div className="h-64 w-48 relative rounded-lg overflow-hidden cursor-pointer">
      <img
        src={
          bannerUrl
            ? bannerUrl
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomRIT4OKajo2mGAToSVe48g_SBEMF3PJO1vRPLTJe420MpxJsj7McYZ57_ibN3UVgJrQ&usqp=CAU"
        }
        className="h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 pt-16 px-4 pb-4 bg-[ linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%);]">
        <strong className="block leading-tight text-zinc-100">{title}</strong>

        <span className="block leading-tight text-zinc-300">{modality}</span>
      </div>
    </div>
  );
}
