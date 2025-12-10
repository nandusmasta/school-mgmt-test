const { z } = require("zod");

const AddStudentSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        phone: z.string().optional(),
        gender: z.enum(["Male", "Female", "Other"]).optional(),
        dob: z.string().optional(),
        class: z.string().optional(),
        section: z.string().optional(),
        roll: z.number().int().positive().optional(),
        admissionDate: z.string().optional(),
        fatherName: z.string().optional(),
        fatherPhone: z.string().optional(),
        motherName: z.string().optional(),
        motherPhone: z.string().optional(),
        guardianName: z.string().optional(),
        guardianPhone: z.string().optional(),
        relationOfGuardian: z.string().optional(),
        currentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
    })
});

const UpdateStudentSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "Invalid student ID")
    }),
    body: z.object({
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        gender: z.enum(["Male", "Female", "Other"]).optional(),
        dob: z.string().optional(),
        class: z.string().optional(),
        section: z.string().optional(),
        roll: z.number().int().positive().optional(),
        admissionDate: z.string().optional(),
        fatherName: z.string().optional(),
        fatherPhone: z.string().optional(),
        motherName: z.string().optional(),
        motherPhone: z.string().optional(),
        guardianName: z.string().optional(),
        guardianPhone: z.string().optional(),
        relationOfGuardian: z.string().optional(),
        currentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        systemAccess: z.boolean().optional(),
    })
});

const StudentIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "Invalid student ID")
    })
});

const StudentStatusSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "Invalid student ID")
    }),
    body: z.object({
        status: z.boolean({ required_error: "Status is required" })
    })
});

module.exports = {
    AddStudentSchema,
    UpdateStudentSchema,
    StudentIdSchema,
    StudentStatusSchema,
};
