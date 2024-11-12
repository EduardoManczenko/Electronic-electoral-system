export default function HeaderText({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className="bg-[#699269] border-[2px] border-green-100 px-4 py-2 text-lg text-white rounded-md cursor-pointer">{children}</div>
    )
}