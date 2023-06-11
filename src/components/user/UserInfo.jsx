import React from 'react';
import './UserInfo.css';

const UserInfo = ({ nume, prenume, imagine, descriere }) => {
    return (
        <div className="user-info">
            <div className="user-info-image">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAABWVlZgYGDb29v5+fnz8/Pj4+OlpaW7u7vv7+/m5uaKiorp6elGRkb19fV7e3uzs7NqampycnLT09ODg4PFxcW/v7+pqamWlpaenp7Q0NAnJydSUlI6Ojqvr68ZGRlmZmYbGxsyMjI+Pj4RERGYmJgsLCxDQ0PRPzEMAAAEx0lEQVR4nO3diXaqMBAGYKMoWpdiVdy11m7v/4RXqtYqAZIww0y48z2AJ/8Rsic0GkIIIYQQQgghhBBCCCGEEEIIIYQQQgghXHTCYB2Pe/N10G9TlwVcsIh26s521utTlwpKZ99Seq8v4yfq0pX2vNhlxLt47z5Tl7GM4CU/3tkkpC6nq+nWJF+iOaUuq4th1tun1fKv2hnY5EvM/GpB4g/bgCdz6lJbmDjkO5lQl9tUuHELeGog/ahVY9d8iZi69Aa6ZQIq1aUuf6FluYBKDagTFIjKBuQecVY+oFJL6hQ5rJt5vQV1jkwLmIB8a9QpVEClhtRZtDpwAdUbdRgt47GSCY4duBVkQI7d8BA2oFLUgVJG0Aln1IkejKEDKsVsnAEfUDWpM90p3d/W4TQ91cYIqLbUsf5A+QuVCqhz3eAEVAfqXL96SAkVm1UN8LbwakWd7GKIFVAdqaNdAPdI/2Iy1/+Ol5DHzNsTXkAmTSJCl/SGxXKN4yKFGRY9N+dVChMcXkTM11CpF+p4J2vUhBxaxD1qQg6TGUDz3FkYdE0PuAkZVKag06Rpa+p8yI2FUj3qfGij3ysG61DICRk0+cgJGQyCkRMy+A9ddj9Z2FPn+x/q0vq3h0abZN0xmBUG2WCSjcEgH2wDhh51vEbJjXqFRtTxGthjfBYrwagJx9TpElY71m2xWOouuaE01wd1uB8BYkImG4cQe6YM+mwJxDafQXufwJsxbVFHu0J7TNnsM0VbIqUO9gurW8NowzfSAhujs5d9lIAs+qRXB4yEjP5CnA0njN7CBMIKFHWkR+ABmXTYbqCH+jz2mdwBnnPrUOfRAO27sXtGE5DjRCbjwkdwexZ21FGyAByvPGPV1t8BmpRisudSC2SZhsFSRQ6AiLwDAjyoLGZIc5WrbjYcW/pHZWaIR0wm1wq4z72xGvPmaTu+jGym1gy4nKKZ+PGEXrVtK5wjg02IlvpWjyqLdUJrZneZnWwYbAtyNDQ5mNj0qYLRiPNni78XfMcR5qZLfW/1Ler50IMxFPaWre3xEu31vRkt1jVK91f7hLoMQgghhBBCCB6egni/+hxEk0OrGodJNFiuxusAf1jyHOwjxHs+DDQHiJ9UiAcFHwGoTKuLcDdmjHy8ydbXJ+gaVYh8tsnNbgH1Ws7RroEqbQbxtI7fqGPkmpTNuP6ijlAoKvOsdlAP/IBxXxNAvR4J0sjtepD2gbrgFly2wYXIp9CBRdYB59RFtvVtWeF48wre2O1TQb4ZCYlF0+hnQIsbl3BPZyN6NXwXMc+EIjPceUtdzDKMLrBrUpeyFINLl3ytZa4K5zhwb0ioQOGr6MdoIk/Bc4p7zWM18jfoHIt/gL3cTapoV49XKq9rU4e/MPdPrMNbmMjuvPlfkZ5l3mLnfVt4tclKiHnRTLWydlTzndu2lVHXQH5VjJo+YT0awzP9whTq7fEV0996inyJZaW+dQFr01b80DX63s4/aemOaSJ+S4WA7gxOnSoa/Sd369PeJ3STbtRlgqX7agR1mYClA9apz5ZIJwT/jiix9HyUx6sVWumltrolTPe965Yw3amRhL6RhP6ThP6ThP6ThP6ThP6ThP6ThP6ThP5LJwxHzToZ8b9gUgghPPIPAB9qWTAi70EAAAAASUVORK5CYII=" alt={`${nume} ${prenume}`} />
            </div>
            <div className="user-info-details">
                <h2>{nume} {prenume}</h2>
                <p>{descriere}</p>
            </div>
        </div>
    );
};

export default UserInfo;
