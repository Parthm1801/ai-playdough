import PopChoiceHeader from "@/app/pop-choice/components/PopChoiceHeader";
import PopChoiceContent from "@/app/pop-choice/components/PopChoiceContent";
import PopChoiceFooter from "@/app/pop-choice/components/PopChoiceFooter";

const PopChoicePage = () => {
    return <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            padding: '50px',
            backgroundColor: '#5f5f5f',
        }}
    >
        <PopChoiceHeader/>
        <PopChoiceContent/>
        <PopChoiceFooter/>
    </div>
}

export default PopChoicePage;