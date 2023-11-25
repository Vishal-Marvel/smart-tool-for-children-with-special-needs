"use client"
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Users} from "@prisma/client";
import {useState} from "react";
import {PopUpNotification} from "@/components/PopUpNotification";
import {ArrowLeft} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"

interface EditProfileProps {
    profile: Users
}


const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    age: z.string().min(1, "Age is Required"),
    gender: z.string().min(1, "Gender Is required"),
    weight: z.string().min(1, "Weight is Required"),
    height: z.string().min(1, "Height is Required"),
    phone: z.string().min(10, "Number must be 10 digits"),
    medicalHistory: z.string().min(1, "Medical History is Required"),
});

export function EditProfile({profile}: EditProfileProps) {

    const [popup, setPopup] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: profile.name,
            age: profile.age,
            gender: profile.gender,
            weight: profile.weight,
            height: profile.height,
            phone: profile.phone_no,
            medicalHistory: profile.medical_history
        }
    });
    const isLoading = form.formState.isSubmitting;
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setPopup(true);
            await axios.put("/api/edit-profile", values);
            form.reset()
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <Card className="w-fit  ">
                <CardHeader>
                    <div className={"flex flex-row"}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <ArrowLeft onClick={() => router.push("/dashboard")}
                                               className={"cursor-pointer transition-all duration-100 hover:scale-125"}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Dashboard</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>


                        <CardTitle className={"ml-2"}>Edit Profile</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid w-full items-center gap-4 grid-cols-3">
                                <FormField
                                    disabled={isLoading}
                                    name={"name"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    placeholder="Enter your Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                    }/>
                                <FormField
                                    disabled={isLoading}
                                    name={"age"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Age:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    placeholder="Enter your Age"
                                                    type={"number"}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                    }/>
                                <FormField
                                    disabled={isLoading}
                                    name={"gender"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Gender:</FormLabel>
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={field.onChange}
                                                defaultValue={profile.gender}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Gender"/>
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                    }/>
                                <FormField
                                    disabled={isLoading}
                                    name={"weight"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Weight (Kg)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Weight" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                    }/>
                                <FormField
                                    disabled={isLoading}
                                    name={"height"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Height: (cm)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    placeholder="Enter your Height"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                    }/>
                                <FormField
                                    disabled={isLoading}
                                    name={"phone"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Phone Number:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    placeholder="Enter your Phone Number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                    }/>
                            </div>
                            <FormField
                                disabled={isLoading}
                                name={"medicalHistory"}
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Medical History</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Your Medical History"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                                }/>

                            <div className="flex flex-col space-y-1.5 pt-2">
                                <Button type="submit">Edit Profile</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>

            </Card>
            <PopUpNotification display={popup} title={"Profile Edited"}
                               buttonOnClick={() => (router.push("/dashboard"))}/>
        </>
    );
}
