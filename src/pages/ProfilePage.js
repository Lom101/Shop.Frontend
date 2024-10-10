import React, { useEffect, useState } from 'react';
import {fetchProfile} from "../http/userAPI";
import { Container, Card, Alert, Button } from 'react-bootstrap';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    // fetchProfile
    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const data = await fetchProfile();
                setProfile(data); // Сохраняем данные профиля в состояние
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfileInfo();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!profile) {
        return <div>Загрузка...</div>;
    }

    return (
        <Container className="my-5 ">
            <h1 className="mb-4 text-3xl font-bold text-center">Личный кабинет</h1>
            {error && (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            )}
            {profile ? (
                <Card className="w-75 mx-auto border-0">
                    <Card.Body>
                        <Card.Title className="text-center"></Card.Title>
                        <Card.Text className="text-center">
                            <h1 className=" text-xl font-bold ">Email:</h1> <h1>{profile.email}</h1>
                        </Card.Text>
                        <Card.Text className="text-center">
                            <h1 className="text-xl font-bold ">User ID:</h1> <h1>{profile.userId}</h1>
                        </Card.Text>
                        <div className="text-center">
                            <Button variant="primary" className="mt-3">
                                ТЫК ТЫК ТЫК
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <div className="text-center">
                    <p className="">Loading profile information...</p>
                </div>
            )}
        </Container>
    );
};

export default ProfilePage;
