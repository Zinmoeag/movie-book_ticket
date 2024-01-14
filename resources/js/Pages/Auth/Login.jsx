import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import withAuthLogic from "./GuessLayout"

const Login = ({ form }) => {


    const submit = (e) => {
        e.preventDefault();
        form.post(route('login'));
    };

    return (
        <>
        <div className='bg-white px-6 py-8 rounded-lg w-[30rem]'>
            <h3 className='uppercase text-[3rem] text-slate-950 pb-4'>Login</h3>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={form.data.email}
                        className="mt-1 block w-full text-slate-900"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => form.setData('email', e.target.value)}
                    />

                    <InputError message={form.errors.email} className="mt-2" />
                </div>
form.
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={form.data.password}
                        className="mt-1 block w-full text-slate-900"
                        autoComplete="current-password"
                        onChange={(e) => form.setData('password', e.target.value)}
                    />

                    <InputError message={form.errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={form.data.remember}
                            onChange={(e) => form.setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('password.request')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Forgot your password?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={form.processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </div>
        </>
    )
}

export default withAuthLogic(Login);
