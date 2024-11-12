export default function HeaderText({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className=" text-lg text-white rounded-md cursor-pointer">{children}</div>
    )
}