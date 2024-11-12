export default function HeaderText({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className="bg-[#699269] px-4 py-2 text-lg text-white rounded-md cursor-pointer">{children}</div>
    )
}