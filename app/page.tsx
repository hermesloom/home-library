export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to Luttmissen Library
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Discover a world of knowledge, stories, and resources for all ages
          </p>
        </div>
      </div>
    </div>
  )
}
