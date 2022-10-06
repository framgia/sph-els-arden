# Generated by Django 4.1.1 on 2022-10-06 01:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admins', '0004_alter_category_title_question'),
        ('lessons', '0002_remove_lesson_user_id_lesson_profile_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(max_length=50)),
                ('correct', models.BooleanField(default=False)),
                ('lesson_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lessons.lesson')),
                ('question_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admins.question')),
            ],
        ),
    ]
