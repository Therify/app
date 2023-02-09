import { TwoColumnGrid } from '../../../ui/Grids/TwoColumnGrid';
import { useForm } from 'react-hook-form';
import { AreaOfFocus, InsuranceProvider, Pronoun, State } from '@/lib/types';
import { useEffect, useState } from 'react';
import { ProviderProfile as ProviderProfileUi } from '../../directory/ProviderProfile';
import { ProfileEditorForm } from './ui/ProfileEditorForm';
import { ProviderProfile } from '@/lib/types/providerProfile';

export function CreateOrUpdateProfile() {
    const providerProfileForm = useForm<ProviderProfile>({
        mode: 'onChange',
        defaultValues: {},
    });
    const offersSlidingScale = providerProfileForm.watch('offersSlidingScale');
    const [givenName, setGivenName] = useState('John');
    const [surname, setSurname] = useState('Smith');
    const [bio, setBio] = useState('');
    const [acceptedInsurances, setAcceptedInsurances] = useState<
        InsuranceProvider.InsuranceProvider[]
    >([]);
    const [specialties, setSpecialties] = useState<AreaOfFocus.AreaOfFocus[]>(
        []
    );
    const [pronouns, setPronouns] = useState<Pronoun.Pronoun>(
        Pronoun.MAP.THEY_THEM
    );
    const [state, setState] = useState<State.State>(State.MAP.NEW_YORK);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [offersInPerson, setOffersInPerson] = useState(false);
    const [offersVirtual, setOffersVirtual] = useState(false);
    const [education, setEducation] = useState('');
    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };
    return (
        <TwoColumnGrid
            leftSlot={
                <ProfileEditorForm
                    onSelectFile={onSelectFile}
                    offersSlidingScale={offersSlidingScale}
                    control={providerProfileForm.control}
                    defaultValues={{}}
                />
            }
            rightSlot={
                <ProviderProfileUi
                    profileImageUrl={preview}
                    givenName={givenName}
                    surname={surname}
                    pronouns={pronouns}
                    state={state}
                    acceptedInsurances={acceptedInsurances}
                    specialties={specialties}
                    bio={bio}
                    offersInPerson={offersInPerson}
                    offersVirtual={offersVirtual}
                />
            }
        />
    );
}
