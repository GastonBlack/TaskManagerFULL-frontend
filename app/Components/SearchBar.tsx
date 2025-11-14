type SearchBarProps = {
    searchInput: string;
    setSearchInput: (value: string) => void;
}

export default function SearchBar({ searchInput, setSearchInput }: SearchBarProps) {
    return (
        <div className="
            bg-transparent flex items-center w-[100%] h-12 rounded-4xl text-black gap-2
            md:w-[70%] md:gap-3
            lg:w-[40%] lg:gap-4
        ">
            <svg xmlns="http://www.w3.org/2000/svg"
                className="
                    w-12 h-12 cursor-pointer flex justify-center items-center rounded-4xl bg-white p-2 shadow-xl
                    hover:scale-105
                    smooth-transition
                "
                viewBox="0 0 96 96">
                <path fill="currentColor" d="M90.829 85.172 68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z"></path>
            </svg>
            <input
                className="
                    w-full h-full px-4 rounded-4xl bg-white shadow-xl text-inherit placeholder-gray-400
                    hover:scale-101
                    focus:outline-none focus:scale-102
                    smooth-transition
                "
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Look for a task..."
            />
        </div>
    )
}