import SongProvider from "./SongProvider";

export const withSong =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    return (
      <SongProvider>
        <Component {...props} />
      </SongProvider>
    );
  };
