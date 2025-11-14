
type HeaderButtonsProps = {
    onShowNoteModal: (value: boolean) => void;
    onDeleteNotes: () => void;
    onLoadTestNotes: () => void;
}

export default function HeaderButtons({ onShowNoteModal, onDeleteNotes, onLoadTestNotes }: HeaderButtonsProps) {
    return (
        <section
            className="
                flex w-screen justify-center items-center gap-8 mt-8 text-black
            "
        >
            <button
                className="font-bold cursor-pointer text-gray-600 hover:scale-102"
                onClick={() => onLoadTestNotes()}
            >
                <p>Load test notes</p>
            </button>

            <button
                className="
                    bg-green-700 py-2 px-[24px] rounded-sm text-white font-bold cursor-pointer shadow-xl
                    hover:scale-x-105 smooth-transition
                "
                onClick={() => onShowNoteModal(true)}
            >
                <p>Add note</p>
            </button>

            <button
                className="text-red-700 text-underlined font-bold cursor-pointer hover:scale-102"
                onClick={() => onDeleteNotes()}
            >
                <p>Delete all notes</p>
            </button>
        </section>
    );
}